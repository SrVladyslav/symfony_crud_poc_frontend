'use client'

import React, {useState} from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useServerUrl } from '@/hooks/useServerUrl'
import { toast } from 'sonner';
import PageLimitSelector from '@/components/PageLimitSelector'

const ServerUrlSelection =()=>{
    const { serverUrl, updateServerUrl } = useServerUrl()
    const [ urlInput, setUrlInput ] = useState<string>(serverUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (urlInput.trim() !== '') {
            updateServerUrl(urlInput)
            toast.success('URL Changed, reload the page to see the changes');
            setUrlInput('')
        }
    };

    return <div className='relative w-full p-5 bg-[white] drop-shadow-sm rounded-md flex flex-col gap-6'>
        <form onSubmit={handleSubmit} className='relative w-full flex flex-col gap-4'>
            <div className='relative w-full grid grid-cols-1 xs:grid-cols-[150px_auto] sm:grid-cols-[250px_auto] gap-4'>
                <PageLimitSelector/>
                <Input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter new server URL"
                    className="w-full h-[32px]"
                    required
                />
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-[auto_100px] items-center justify-between gap-y-2'>
                <h5 className='text-xs text-[var(--foreground)]'>Current server URL: <span className='relative tracking-wider font-semibold'>{serverUrl}</span></h5>
                <div className='flex justify-center sm:justify-end'>
                    <Button type="submit" size='sm' variant="default" className="w-fit">
                        Change URL
                    </Button>
                </div>
            </div>
        </form>
    </div>
}

export default ServerUrlSelection