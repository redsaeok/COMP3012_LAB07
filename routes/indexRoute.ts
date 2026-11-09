import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send(
    "<pre><strong>http://localhost:8000/auth/login</strong> for the login page. </pre><pre><strong>http://localhost:8000/dashboard</strong> for the dashboard (requires login).</pre>",
  );
});


router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }

  if (!req.sessionStore) {
    return res.status(500).send("Could not access session store");
  }

  console.log("Session store:", req.sessionStore);
  req.sessionStore.all?.((err, sessions) => {
    if (err) {
      console.error("Error retrieving sessions:", err);
      return res.status(500).send("Error retrieving sessions");
    }

    console.log("Active sessions:", sessions);
    res.render("admin", {sessions});
    //res.send(`<h1>Admin Page</h1><p>Active sessions: ${JSON.stringify(sessions, null, 2)}</p>`);
  });

});

router.post("/admin", ensureAuthenticated, (req, res) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }

  const { sessionId } = req.body;

  if (!req.sessionStore) {
    return res.status(500).send("Could not access session store");
  }

  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session");
    }
    console.log(`Session ${sessionId} destroyed`);
    res.redirect("/admin");
  });
});

export default router;
