import { selectAuth } from "@src/apps/auth/redux";
import { useAppSelector } from "@src/shared/store";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaKey,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const loggedInItems = [
  { label: "Change profile", icon: FaEdit, to: "/profile" },
  { label: "Change password", icon: FaKey, to: "/change-password" },
  { label: "Sign out", icon: FaSignOutAlt, to: "/logout" },
];

const loggedOutItems = [
  { label: "Sign in", icon: FaSignInAlt, to: "/login" },
  { label: "Create account", icon: FaUserPlus, to: "/register" },
];

export default function AuthMenu({ darkMode }: { darkMode: boolean }) {
  const auth = useAppSelector(selectAuth);
  const items = auth.user ? loggedInItems : loggedOutItems;

  return (
    <Menu>
      <MenuButton
        className={`p-2 rounded-md transition-colors ${
          darkMode
            ? "hover:bg-gray-800 text-gray-300"
            : "hover:bg-gray-200 text-gray-700"
        }`}
      >
        <FaUser className="h-4 w-4" />
      </MenuButton>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <MenuItems
          anchor="bottom end"
          className={`z-50 w-56 mt-2 rounded-md shadow-lg border focus:outline-none ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="py-1">
            {auth.user && (
              <div
                className={`px-4 py-3 text-sm border-b ${
                  darkMode
                    ? "border-gray-700 text-gray-200"
                    : "border-gray-200 text-gray-900"
                }`}
              >
                <p className="font-medium">{"John Doe"}</p>
              </div>
            )}
            {items.map(({ label, icon: Icon, to }) => (
              <MenuItem key={label}>
                {({ focus }) => (
                  <Link
                    to={to}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                      focus
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    <Icon className="mr-2 h-3.5 w-3.5" />
                    {label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
