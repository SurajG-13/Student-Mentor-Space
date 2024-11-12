import React from "react";
import { Link } from "react-router-dom";

function SidebarLink({ children, name, isOpen, to, onClick }) {
  return (
    <>
      <div>
        <Link
          to={to}
          onClick={onClick}
          className="flex p-1 rounded cursor-pointer stroke-[0.75]
                  dark:hover:stroke-neutral-100 dark:stroke-neutral-400
                  dark:text-neutral-400 dark:hover:text-neutral-100 
                  place-items-center gap-3 dark:hover:bg-neutral-700/30 
                  hover:bg-gray-50 stroke-black text-neutral-950
                  transition-colors duration-100"
        >
          {children} {/* This is Icons */}
          {isOpen && (
            <p
              className="dark:text-inherit text-black 
                        overflow-clip whitespace-nowrap 
                        tracking-wide"
            >
              {name}
            </p>
          )}
        </Link>
      </div>
    </>
  );
}

export default SidebarLink;
