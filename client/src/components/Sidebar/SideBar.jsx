import { NavLink } from "react-router-dom";
import { FaBars, FaBox, FaBus } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillSignpost2Fill } from "react-icons/bs";

import { RiUserSettingsFill } from "react-icons/ri";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <MdDashboard size={25} className="colored-icon" />,
  },
  {
    path: "/levels",
    name: "Levels",
    icon: <BsFillSignpost2Fill size={25} className="colored-icon" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <RiUserSettingsFill size={25} className="colored-icon" />,
  },
  {
    path: "/devices",
    name: "Devices",
    icon: <FaBox size={25} className="colored-icon" />,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: <FaBus size={25} className="colored-icon" />,
  },

];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "90px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="bars" style={{ display: 'flex', justifyContent: 'center' }}>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="icon">{route.icon}</div>
                    {!isOpen && (
                      <div style={{color:'#7f8c8d'}}>
                        {route.name}
                      </div>
                    )}

                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
