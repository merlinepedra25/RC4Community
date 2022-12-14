import { useState } from "react";
import { NoUserAvatar } from "../../NoUserAvatar";
import { Button } from "react-bootstrap";
import styles from "../styles/DummyLoginButton.module.css";
import { useDummyAuth } from "../hooks/useDummyAuth";
import Image from "next/image";

export default function DummyLoginButton() {
  const [isLoginUiOpen, setIsLoginUiOpen] = useState(false);
  const { user, handleLogin, handleLogout } = useDummyAuth();

  return (
    <div className={styles.authDialogWrapper}>
      <div className={styles.avatar}>
        <button className={styles.avatarButton}>
          <span
            className="d-flex align-items-center"
            onClick={() => setIsLoginUiOpen((prev) => !prev)}
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                height={42}
                width={42}
              />
            ) : (
              <NoUserAvatar name={user?.name} size="42" />
            )}
          </span>
        </button>
      </div>
      {isLoginUiOpen && (
        <div className={styles.authContainer}>
          {user.id ? (
            <>
              <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
                <div className="mb-1">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      height={64}
                      width={64}
                    />
                  ) : (
                    <NoUserAvatar size="64" name={user.name} />
                  )}
                </div>
                <div className="font-weight-bold mb-1">{user.name}</div>
                <div className="mb-1" style={{ color: "var(--bs-gray-700)" }}>
                  {user.email}
                </div>
              </div>
              <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
                <Button variant="secondary" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center my-3">
              <Button onClick={handleLogin}>Login</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
