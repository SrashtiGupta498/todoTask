import { Outlet } from "react-router-dom";
export default function Sidebar() {

    const [darkMode, setDarkMode] = useState(() => {
      const stored = localStorage.getItem("darkMode");
      return stored !== null ? JSON.parse(stored) : false;
    });
  
    useEffect(() =>{
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if(darkMode){
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    } , [darkMode]);




  const navigate = useNavigate();
  const tasks: TaskType[] = useSelector((state: RootState) => state.task.tasks);

  const todayCount = tasks.filter(
    (task) => new Date(task.date).toDateString() === new Date().toDateString()
  ).length;
  const upcomingCount = tasks.filter(
    (task) => new Date(task.date) >= new Date()
  ).length;

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-white shadow-md p-4 flex flex-col justify-between border-r">
        {/* Top Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Menu</h2>

     
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Tasks */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tasks</p>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-gray-700 hover:text-black cursor-pointer">
                <span className="flex items-center space-x-2">
                  <span className="text-sm">Upcoming</span>
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {upcomingCount}
                </span>
              </li>

              {/* <li
                className="flex justify-between items-center  text-grey 700 hover:bg-gray-100 font-medium px-3 py-2 rounded-lg cursor-pointer"
                onClick={() => navigate("/")}
              > */}
              <li
                className={`flex justify-between items-center font-medium px-3 py-2 rounded-lg cursor-pointer ${
                  location.pathname === "/"
                    ? "bg-amber-600 "
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => navigate("/")}
              >
                <span className="flex items-center gap-2">
                  <Home size={16} />
                  <span className="text-sm">Today</span>
                </span>
                <span className="text-xs bg-white px-2 py-0.5 rounded-full">
                  {todayCount}
                </span>
              </li>

              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer focus:outline-none  ${
                  location.pathname === "/calendar"
                    ? "bg-amber-600 "
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => navigate("/calendar")}
              >
                <CheckCircle size={16} />
                <span className="text-sm">Calendar</span>
              </li>

              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer focus:outline-none  ${
                     location.pathname === "/sticky-wall"
                    ? "bg-amber-600 "
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
                onClick={() => navigate("/sticky-wall")}
              >
                <StickyNote size={16} />
                <span className="text-sm">Sticky Wall</span>
              </li>
            </ul>
          </section>

          {/* Lists Section */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Lists
            </h3>
            <ul className="space-y-3">
              {[...new Set(tasks.flatMap((item) => item.list))].map(
                (listName, index) => (
                <li
  key={index}
  className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer ${
    location.pathname === `/list/${listName}`
      ? "bg-pink-600 text-white"
      : "text-pink-600 hover:text-pink-800 hover:bg-pink-50"
  }`}
  onClick={() => navigate(`/list/${listName}`)}
>
                    <span className="flex items-center gap-2">
                      <List size={16} />
                      <span className="text-sm">{listName}</span>
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {
                        tasks.filter((task) => task.list.includes(listName))
                          .length
                      }
                    </span>
                  </li>
                )
              )}
            </ul>
          </section>
        </div>

        {/* Footer */}
        {/* <footer className="space-y-2 text-sm text-gray-600">

      <button onClick={() => setDarkMode(!darkMode)} data-tooltip-target="navbar-search-example-toggle-dark-mode-tooltip" type="button" data-toggle-dark="light" className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            { darkMode ? (<svg aria-hidden="true" data-toggle-icon="sun" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>) : (<svg aria-hidden="true" data-toggle-icon="moon" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>) }
          </button>
        </footer>  */}
        <span></span>
        <span></span>
        <footer className="mt-8 border-t pt-4 border-gray-200 dark:border-gray-700">
  <div className="flex items-center justify-between">
    <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} TaskBoard</p>

    <button
      onClick={() => setDarkMode(!darkMode)}
      title="Toggle Theme"
      type="button"
      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-amber-100 dark:hover:bg-amber-700 hover:text-amber-700 dark:hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
    >
      {darkMode ? (
        <>
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            ></path>
          </svg>
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <span>Dark Mode</span>
        </>
      )}
    </button>
  </div>
</footer>

  


      </aside>

      {/* Main Page Content */}
   <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white">

        <Outlet />
      </main>
    </div>
    </Layout>
  );
}


     {/* <div
            className="flex items-center gap-2 cursor-pointer hover:text-black transition focus:outline-none focus:ring-2 focus:ring-amber-500"
            onClick={() => navigate("/settings")}
          >
            <Settings size={16} />
            <span>Settings</span>
          </div> */}
          {/* <div
            className={`flex items-center gap-2 cursor-pointer transition focus:outline-none ${
                 location.pathname === "/SignIn"
                    ? "bg-amber-600 "
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            onClick={() => navigate("/SignIn")}
          >
            <LogIn size={16} />
            <span>Sign In</span> */}
          {/* </div> */}