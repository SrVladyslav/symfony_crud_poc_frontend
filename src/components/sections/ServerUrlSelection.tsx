'use client'

import React, {useState} from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useServerUrl } from '@/hooks/useServerUrl'
import { toast } from 'sonner';

const ServerUrlSelection =()=>{
    const {serverUrl, updateServerUrl} = useServerUrl()
    const [urlInput, setUrlInput] = useState<string>(serverUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (urlInput.trim() !== '') {
            updateServerUrl(urlInput);
            toast.success('URL Changed, reload the page to see the changes');
            setUrlInput('')
        }
    };

    return <div className='relative w-full grid grid-cols-1 sm:grid-cols-2 p-5 bg-[white] drop-shadow-sm rounded-md justify-between items-center'>	
        <h5 className='text-xs text-[var(--foreground)]'>Current server URL: <span className='relative tracking-wider font-semibold'>{serverUrl}</span></h5>
        <form onSubmit={handleSubmit} className="flex flex-row space-x-2 w-full">
            <Input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter new server URL"
                className="w-full h-[32px]"
                required
            />
            <Button type="submit" size='sm' variant="default" className="w-fit">
                Change URL
            </Button>
      </form>
    </div>
}

export default ServerUrlSelection