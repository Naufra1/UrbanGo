import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <div className="navigation-invisible-bar">
        <img
          src="./src/client/assets/UrbanGo.jpg"
          alt="Logo da UrbanGo"
          className="logo"
        />
        <div className="navigation-buttons">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navigation-button active" : "navigation-button"
            }
          >
            Viagem
          </NavLink>
          <NavLink
            to="/historico"
            className={({ isActive }) =>
              isActive ? "navigation-button active" : "navigation-button"
            }
          >
            Historico
          </NavLink>
        </div>
      </div>
    </div>
  );
}
