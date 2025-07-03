import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation, useNavigate, Navigate, Link,
} from "react-router-dom";
import {Menu as MenuIcon, Bell} from "lucide-react";
import {jwtDecode} from "jwt-decode";

import {Toaster} from "react-hot-toast";



import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useQuery} from "@tanstack/react-query";
// import Applications from "./pages/Applications.jsx";
// import RatingBook from "./pages/RatingBook.jsx";
// import {UserMe} from "./Api/UserApi.jsx";
// import ListApplication from "./pages/ListApplication.jsx";
// import NoListApplication from "./pages/NoListApplication.jsx";


function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem("token"));
    const location = useLocation();
    if (!token) {
            return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
}

function App() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation(); // Get current route location
    const isLoginPage = location.pathname === "/login" || location.pathname === "/";
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
        } else {
            setUserRole(null);
        }
    }, [localStorage.getItem("token")]);

    // const {isError, isSuccess, isLoading, data: student, error, refetch} = useQuery({
    //     queryKey: ['userMe'],
    //     queryFn: UserMe,
    // })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        localStorage.removeItem("token");
        return <Navigate to="/login" state={{from: location}} replace/>;
    };
    return (
        <div className="min-h-screen bg-[#F5F5F9] ">
            <div className={` ${!isLoginPage ? "pt-8" : ""}`}>
                {!isLoginPage && <Sidebar isOpen={isSidebarOpen}/>}
                <header className={`bg-white px-6 mx-6 transition-all duration-300  text-black sticky top-0   z-10 ${
                    !isLoginPage && isSidebarOpen
                        ? "sm:ml-72"
                        : !isLoginPage
                            ? "sm:ml-28"
                            : "hidden"
                }`}
                >

                    <div className="w flex  items-center justify-between  h-16">
                        <div className="flex items-center space-x-4">
                            <MenuIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            />
                            <HemisLogo className="h-8"/>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Bell className="h-5 w-5 cursor-pointer"/>
                            <div>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? "fade-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <div className="flex items-center space-x-3 text-black">
                                        <div
                                            className="h-8 w-8 rounded-full bg-[#E7E7FF] flex items-center justify-center">
                                            <span className="text-sm font-medium">JS</span>
                                        </div>
                                        <div className="hidden md:block">
                                            {userRole === "student" && (
                                                <div className="text-sm font-medium">{student?.first_name}</div>
                                            )}
                                            {/*<div className="text-sm font-medium">{student?.first_name}</div>*/}
                                            <div className="text-xs text-black">{userRole}</div>
                                        </div>
                                    </div>
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/profile">Profile</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleLogout();
                                            handleClose();
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>

                </header>
                <main
                    className={` p-6  transition-all duration-300 ${
                        !isLoginPage && isSidebarOpen
                            ? "sm:ml-64"
                            : !isLoginPage
                                ? "sm:ml-20"
                                : ""
                    }`}
                >

                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>

                        <Route
                            path="/admin"

                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }

                        />

                        {/*<Route*/}
                        {/*    path="/profile"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <Profile/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/list-application"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <ListApplication/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/no-list-application"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <NoListApplication/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/rating"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <RatingBook/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/application"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <Applications/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        <Route path="*" element={<div>404 - Sahifa topilmadi</div>}/>


                    </Routes>
                    <Toaster/>
                </main>
            </div>
        </div>
    );
}

export default App;