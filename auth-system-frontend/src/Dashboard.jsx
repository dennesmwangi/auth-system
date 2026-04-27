import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true },
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
    //console.log("Logout clicked");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (confirmed) {
      try {
        const res = await axios.post(
          "/api/delete-account",
          {},
          { withCredentials: true },
        );
        toast.success(res.data.message);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/dashboard", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard",
        );
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome, <br /> {`${user.first_name} ${user.last_name}`}
            </p>
          </div>

          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-grid">
          <div className="card profile-card">
            <h2>Profile</h2>
            <div className="profile-info">
              <div className="info-row">
                <span>Full name</span>
                <strong>{`${user.first_name} ${user.last_name}`}</strong>
              </div>
              <div className="info-row">
                <span>Email</span>
                <strong>{user.email_address}</strong>
                <strong>
                  {user.email_address_verified ? "Verified" : "Unverified"}
                </strong>
              </div>

              <div className="info-row">
                <span>Phone</span>
                <strong>
                  {user.phone_number ? user.phone_number : "No Phone added"}
                </strong>

                <strong>
                  {user.phone_number_verified ? "Verified" : "Unverified"}
                </strong>
              </div>

              <div className="info-row">
                <span>Role</span>
                <strong>
                  {user.user_role[0].toUpperCase() + user.user_role.slice(1)}
                </strong>
              </div>
              <div className="info-row">
                <span>Joined</span>
                <strong>
                  {new Date(user.created_at).toLocaleString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>

            <div className="card-actions">
              <Link className="link btn btn-dark" to="/edit-profile">
                Edit Profile
              </Link>

              <Link className="link btn btn-outline" to="/change-password">
                Change Password
              </Link>
            </div>
          </div>

          <div className="card quick-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="btn btn-dark">View Activity</button>
              <button className="btn btn-dark">Notifications</button>
              <button className="btn btn-dark">Security Settings</button>
              <button className="btn btn-dark">Billing</button>
            </div>
          </div>

          <div className="card danger-card">
            <h2>Danger Zone</h2>
            <p>
              Deleting your account is permanent. Your profile and related data
              may be removed permanently.
            </p>

            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
