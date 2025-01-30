import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [params, setParams] = useSearchParams();
    const [titleAdded, setTitleAdded] = useState(true);
    const pasteid = params.get('pasteId');
    const dispatch = useDispatch();

    const pastes = useSelector((state)=> state.paste.pastes);
    useEffect(()=>{
        if(pasteid){
            const paste = pastes.find((paste) => paste.pasteId === pasteid);
            if(pastes){
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    },[pasteid]);

    function createPaste() {
        if(title.trim() === ''){
            toast.error('Please enter a title');
            setTitleAdded(false);
            return;
        }
        const paste = {
            title: title,
            content: value || '---No Content---',
            pasteId: pasteid ? pasteid : Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        pasteid ? dispatch(updateToPaste(paste)) : dispatch(addToPaste(paste));
        setTitle('');
        setValue('');
        setParams({});
    }

    useEffect(()=>{
        const handleKeyDown = (e)=>{
            if(e.ctrlKey && e.key === 'Enter'){
                createPaste();
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    },[title, value, pasteid]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-60 to-gray-400 py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-gray-10 to-gray-100 rounded-xl shadow-lg p-6 space-y-6 md:rounded-2xl md:p-8 md:space-y-8">
                    {/* Header */}
                    <div className="border-b border-gray-300 pb-4">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                            {pasteid ? 'Edit Paste' : 'New Paste'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 md:text-base">
                            {pasteid ? 'Update your existing paste' : 'Create a new paste'}
                        </p>
                    </div>

                    {/* Form Area */}
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                            <input
                                type="text"
                                placeholder="Paste Title"
                                autoFocus
                                maxLength={32}
                                className={`${(!titleAdded && title.length === 0) && 'border-2 border-red-600 animate-pulse'} w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-400 rounded-lg  outline-none transition-all text-sm sm:text-base`}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button
                                onClick={createPaste}
                                className="w-full sm:w-auto sm:px-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer text-sm sm:text-base"
                            >
                                <span className="whitespace-nowrap">
                                    {pasteid ? 'Update' : 'Create'} Paste
                                    <span className="ml-2" aria-hidden="true">📋</span>
                                </span>
                            </button>
                        </div>
                        <div>
                            <div className='flex justify-between bg-gray-400 border border-gray-400 border-b-0 rounded-t-lg'>
                                <div className='w-full flex gap-x-[6px] items-center select-none group pl-[0.7rem]'>
                                    <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]"></div>
                                    <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]"></div>
                                    <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]"></div>
                                </div>
                                <button
                                    onClick={() => {
                                        if(value.length > 0) {
                                            navigator.clipboard.writeText(value)
                                            toast.success('Copied to clipboard');
                                        }else{
                                            toast.error('There is nothing to copy')
                                        }
                                    }}
                                    className='pr-[0.4rem] p-1 rounded-lg '
                                    title='Copy'
                                >
                                    <img
                                        src='/assets/icon-copy.png'
                                        alt='Copy'
                                        className='h-5 w-5 opacity-75 hover:opacity-100 transition-opacity'
                                    />
                                </button>
                            </div>
                            <textarea
                                placeholder="Your paste content here..."
                                className="w-full px-4 py-3 border border-gray-400 rounded-b-lg outline-none transition-all h-64 sm:h-80 md:h-96 font-mono text-sm resize-y"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Helper Text */}
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        {pasteid
                            ? 'Remember to update before leaving!'
                            : 'Pro tip: Use Ctrl+Enter to save your paste'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;