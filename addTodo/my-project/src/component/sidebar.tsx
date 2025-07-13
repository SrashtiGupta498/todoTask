import { Outlet } from "react-router-dom";
export default function Sidebar() {
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
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">12</span>
              </li>
              <li className="flex justify-between items-center bg-gray-100 text-black font-semibold rounded px-2 py-1 cursor-pointer">
                <span className="text-sm">Today</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded-full">5</span>
              </li>
              <li className="text-sm text-gray-700 hover:text-black cursor-pointer">Calendar</li>
              <li className="text-sm text-gray-700 hover:text-black cursor-pointer">Sticky Wall</li>
            </ul>
          </div>

          {/* Lists */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Lists</p>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-sm text-pink-500 cursor-pointer">
                <span>Personal</span>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">3</span>
              </li>
              <li className="flex justify-between items-center text-sm text-blue-500 cursor-pointer">
                <span>Work</span>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">6</span>
              </li>
              <li className="flex justify-between items-center text-sm text-yellow-500 cursor-pointer">
                <span>List 1</span>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">3</span>
              </li>
              <li className="text-sm text-gray-700 hover:text-black cursor-pointer">+ Add New List</li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Tag 1</span>
              <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">Tag 2</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">+ Add Tag</span>
            </div>
          </div>
        </div>

        {/* Bottom Settings */}
        <div className="space-y-2 mt-6">
          <div className="text-sm text-gray-600 hover:text-black cursor-pointer">⚙ Settings</div>
          <div className="text-sm text-gray-600 hover:text-black cursor-pointer">↩ Sign out</div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
