import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export const FloatingButton = () => {
    return (
        <div className="group fixed bottom-1 right-1 p-2  flex items-end justify-end">
            <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-black to-black z-50 absolute  ">
                <MagnifyingGlassIcon className='w-8 h-8' />
            </div>
        </div>
    )
}