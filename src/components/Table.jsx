import React, { useState } from 'react';

const Table = ({ passwordArray, setPasswordArray, setForm }) => {
  const [copied, setCopied] = useState({ index: null, field: '' });

  const handleCopy = (text, index, field) => {
    navigator.clipboard.writeText(text);
    setCopied({ index, field });
    setTimeout(() => setCopied({ index: null, field: '' }), 2000);
  };

  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      const updatedArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedArray);
      await fetch('https://password-manager-2793.onrender.com/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    }
  };

  const editPassword = (id) => {
    setForm({ ...passwordArray.find(i => i.id === id), id });
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  return (
    <div className="mt-6 overflow-x-auto w-full max-w-4xl mx-auto shadow-lg rounded-xl">
      <table className="w-full border border-gray-700 bg-gray-900 text-base rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-3 text-left border-b border-gray-700">Site</th>
            <th className="px-4 py-3 text-left border-b border-gray-700">Username</th>
            <th className="px-4 py-3 text-left border-b border-gray-700">Password</th>
            <th className="px-4 py-3 text-center border-b border-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {passwordArray.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center px-6 py-4 text-gray-400 border-t border-gray-700">
                No passwords saved
              </td>
            </tr>
          ) : (
            passwordArray.map((item, index) => (
              <tr key={index} className="transition-all duration-200">
                <td className="px-4 py-3 text-white border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-1 gap-x-2 break-words">
                    <a
                      href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-400 break-all"
                    >
                      {item.site}
                    </a>
                    <div className="flex items-center gap-2">
                      <img
                        src="/copy.png"
                        className="w-4 h-4 cursor-pointer hover:opacity-75"
                        onClick={() => handleCopy(item.site, index, 'site')}
                      />
                      {copied.index === index && copied.field === 'site' && (
                        <span className="text-green-400 text-xs sm:text-sm">Copied!</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-white border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-1 gap-x-2 break-all">
                    {item.username}
                    <div className="flex items-center gap-2">
                      <img
                        src="/copy.png"
                        className="w-4 h-4 cursor-pointer hover:opacity-75"
                        onClick={() => handleCopy(item.username, index, 'username')}
                      />
                      {copied.index === index && copied.field === 'username' && (
                        <span className="text-green-400 text-xs sm:text-sm">Copied!</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-white border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-1 gap-x-2 break-all">
                    {'*'.repeat(item.password.length)}
                    <div className="flex items-center gap-2">
                      <img
                        src="/copy.png"
                        className="w-4 h-4 cursor-pointer hover:opacity-75"
                        onClick={() => handleCopy(item.password, index, 'password')}
                      />
                      {copied.index === index && copied.field === 'password' && (
                        <span className="text-green-400 text-xs sm:text-sm">Copied!</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-white border-t border-gray-700 text-center">
                  <div className="flex justify-center items-center gap-6">
                    <span onClick={() => editPassword(item.id)}>
                      <img
                        src="/edit.png"
                        className="w-5 h-5 cursor-pointer hover:opacity-60"
                        title="Edit"
                      />
                    </span>
                    <span onClick={() => deletePassword(item.id)}>
                      <img
                        src="/delete-icon.jpg"
                        className="w-5 h-5 cursor-pointer hover:opacity-60"
                        title="Delete"
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
