import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste, resetAllPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import Share from './Share';

function Paste() {
    const [search, setSearch] = useState('');
    const [share, setShare] = useState(false);
    const _id = useRef('')

    const pastes = useSelector((state) =>
        state.paste.pastes
    );

    const dispatch = useDispatch();

    const filteredPastes = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(search.toLowerCase())   //always returns true for every title because every string includes an empty string.
    );

    function handleDelete(id) {
        dispatch(removeFromPaste(id));
    }

    function handleShare(id) {
        setShare(true);
        _id.current = id
    }

    function handleClose() {
        setShare(false)
    }

    const [deleteAll, setDeleteAll] = useState(false);
    function handleDeleteAll(){
        if(pastes.length > 0){
            const isConfirmed = confirm('Are you sure you want to delete all pastes?');
            if(isConfirmed){
                setDeleteAll(true);
                setTimeout(()=>{
                    setDeleteAll(false);
                },1000)
                dispatch(resetAllPaste())
            }
        }else{
            toast.error('No pastes available to delete!')
        }
    }

    return (
        <div className='bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg rounded-xl p-6 min-h-dvh mx-auto max-w-3xl'>
            <div className='mb-8'>
                <div className='flex justify-between items-center pb-2 px-2 border-b border-gray-200'>
                    <h1 className='text-3xl font-bold text-gray-700 mb-1'>All Pastes</h1>
                    <button 
                        className='p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200'
                        onClick={handleDeleteAll}
                        title='Delete All Pastes'
                    >
                        <img  
                            className='w-6 h-6 mix-blend-multiply transition-transform duration-200 hover:scale-110'
                            src={deleteAll ? '/src/assets/icon-deleteAll.gif' : 'src/assets/icon-deleteAll-static.png'} 
                            alt='Delete all icon'
                        />
                    </button>
                </div>
                <input
                    type='text'
                    placeholder='Search pastes...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg  focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder-gray-400 transition-all duration-200'
                />
            </div>
            {share &&
                <div>
                    <Share close={handleClose} id={_id} />
                </div>
            }
            <div className='space-y-6'>
                {filteredPastes.length > 0 ? (
                    filteredPastes.map((paste) => (
                        <div key={paste?.pasteId} className='group relative bg-gradient-to-br from-gray-50 to-gray-200 hover:bg-gray-200 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md'>
                            <div className='flex justify-between items-start mb-3'>
                                <h2 className='text-xl font-semibold text-gray-800 max-w-[18rem] text-wrap truncate pr-2'>{paste.title}</h2>
                                <div className='flex items-center space-x-2'>
                                    <div className='flex items-center space-x-1.5'>
                                        <NavLink
                                            to={`/?pasteId=${paste?.pasteId}`}
                                            className='p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200'
                                            title='Edit'
                                        >
                                            <img
                                                src='src\assets\icon-edit.png'
                                                alt='Edit'
                                                className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                            />
                                        </NavLink>

                                        <button
                                            onClick={() => handleDelete(paste?.pasteId)}
                                            className='p-1 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200'
                                            title='Delete'
                                        >
                                            <img
                                                src='src\assets\icon-delete.png'
                                                alt='Delete'
                                                className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                            />
                                        </button>

                                        <button
                                            className='p-1 hover:bg-indigo-50 rounded-lg transition-colors duration-200 border border-indigo-200'
                                            title='Share'
                                            onClick={() => handleShare(paste.pasteId)}
                                        >
                                            <img
                                                src='src\assets\icon-share.png'
                                                alt='Share'
                                                className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                            />
                                        </button>
                                        <NavLink
                                            to={`/paste/${paste?.pasteId}`}
                                            className='p-1 hover:bg-green-50 rounded-lg transition-colors duration-200 border border-green-200'
                                            title='View'
                                        >
                                            <img
                                                src='src\assets\icon-view.png'
                                                alt='View'
                                                className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                            />
                                        </NavLink>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(paste.content)
                                                toast.success('Copied to clipboard');
                                            }}
                                            className='p-1 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-200'
                                            title='Copy'
                                        >
                                            <img
                                                src='src\assets\icon-copy.png'
                                                alt='Copy'
                                                className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-end'>
                                <pre className={` ${paste.content === '---No Content---' && 'text-red-500'} text-gray-700 whitespace-pre-wrap break-words font-mono text-sm flex-1 max-h-20 overflow-hidden mr-3 pr-4`}>
                                    {paste.content.length > 57 ? `${paste.content.substring(0, 55)} ...` : paste.content}
                                </pre>
                                <p className='flex gap-[8px] text-sm text-gray-500 whitespace-nowrap ml-4 self-end italic'>
                                    <svg version="1.0" id="Layer_1"
                                        width="1.1rem" viewBox="0 0 64 64" >
                                        <g>
                                            <path fill="#231F20" d="M11,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,53.553,10.447,54,11,54
		                                        z M12,49h4v3h-4V49z"/>
                                            <path fill="#231F20" d="M23,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,53.553,22.447,54,23,54
		                                        z M24,49h4v3h-4V49z"/>
                                            <path fill="#231F20" d="M35,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,53.553,34.447,54,35,54
		                                        z M36,49h4v3h-4V49z"/>
                                            <path fill="#231F20" d="M11,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,42.553,10.447,43,11,43
		                                        z M12,38h4v3h-4V38z"/>
                                            <path fill="#231F20" d="M23,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,42.553,22.447,43,23,43
		                                        z M24,38h4v3h-4V38z"/>
                                            <path fill="#231F20" d="M35,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,42.553,34.447,43,35,43
		                                        z M36,38h4v3h-4V38z"/>
                                            <path fill="#231F20" d="M47,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,42.553,46.447,43,47,43
		                                        z M48,38h4v3h-4V38z"/>
                                            <path fill="#231F20" d="M11,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,31.553,10.447,32,11,32
		                                        z M12,27h4v3h-4V27z"/>
                                            <path fill="#231F20" d="M23,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,31.553,22.447,32,23,32
		                                        z M24,27h4v3h-4V27z"/>
                                            <path fill="#231F20" d="M35,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,31.553,34.447,32,35,32
		                                        z M36,27h4v3h-4V27z"/>
                                            <path fill="#231F20" d="M47,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,31.553,46.447,32,47,32
		                                        z M48,27h4v3h-4V27z"/>
                                            <path fill="#231F20" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4
		                                        C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M49,3c0-0.553,0.447-1,1-1
		                                        s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1s-1-0.447-1-1V6V3z M13,3c0-0.553,0.447-1,1-1s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1
		                                        s-1-0.447-1-1V6V3z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V17h60V60z M62,15H2V8c0-1.104,0.896-2,2-2h7v4
		                                        c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"/>
                                        </g>
                                    </svg>
                                    {new Date(paste.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            {share && <Share close={handleClose} id={_id} />}

                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-center py-8'>No pastes found</p>
                )}
            </div>
        </div>
    )
}

export default Paste
