import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditProfile() {
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handleEditProfile = async () => {
    if (!firstName || !lastName) {
      return toast.error("Both first name and last name required");
    }

    const checkPhone = /^(?:\+254|254|0)(7\d{8}|1\d{8})$/;

    if (phoneNumber && !checkPhone.test(phoneNumber)) {
      return toast.error("Invalid Phone number");
    }
    try {
      const res = await axios.post(
        "/api/update",
        {
          firstName,
          lastName,
          phoneNumber: phoneNumber || "",
        },
        { withCredentials: true },
      );
      toast.success(res.data.message);

      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      navigate("/edit-profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
    //console.log("Logout clicked");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (confirmed) {
      toast.warning("Sorry to see you leave! Account deleted Successfully!");
      console.log("Account deleted");
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
            <h1>Edit Profile</h1>
            {/*
            <p>
              Welcome, <br /> {`${user.first_name} ${user.last_name}`}
            </p>
            */}
            <span>
              <b>*Note: Only name, phone can be edited!</b> <br />* Phone number
              can be added if not added
            </span>
          </div>

          <Link className="btn btn-small link" onClick={handleLogout}>
            Logout
          </Link>
        </header>

        <section className="dashboard-grid">
          <div className="card profile-card">
            <h2>Profile</h2>
            <div className="profile-info">
              <div className="info-row">
                <span>First name</span>
                <input
                  type="text"
                  value={firstName}
                  placeholder={user.first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="edit-input"
                />
              </div>

              <div className="info-row">
                <span>Last name</span>
                <input
                  type="text"
                  value={lastName}
                  placeholder={user.last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className="edit-input"
                />
              </div>

              <div className="info-row">
                <span>Phone</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="edit-input"
                  placeholder="0712345678"
                />
              </div>

              <div className="info-row">
                <span>Email</span>
                <strong>{user.email_address}</strong>
                <strong>
                  {user.email_address_verified ? "Verified" : "Unverified"}{" "}
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
              <Link
                className="link btn btn-dark"
                onClick={handleEditProfile}
                to="/edit-profile"
              >
                Update Profile
              </Link>

              <Link className="link btn btn-outline" to="/dashboard">
                Back Home
              </Link>
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

export default EditProfile;
