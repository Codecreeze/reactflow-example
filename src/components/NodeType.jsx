import React from 'react';
import { Handle, Position } from 'reactflow';
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export const SourceNode = ({ data }) => {
    return (
        <div className="bg-white p-1 rounded border border-green-400">
            <div className="custom-node">
                <div className='flex items-center'>
                    <div className='bg-gray-200 w-5 h-7 rounded flex items-center justify-center'>
                        <MdArrowForward />
                    </div>
                    <div className='pl-1'>
                        <div className='text-xs'>
                            {data.label}
                        </div>
                        <div className='text-[7px] ml-10 mt-1'>
                            Source
                        </div>
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    className="bg-green-500 w-1 h-5 rounded-none"
                />
            </div>
        </div>
    );
};


export const DestinationNode = ({ data }) => {
    return (
        <div className="bg-white p-1 rounded border border-red-400">
            <div className="custom-node">
                <div className='flex items-center'>
                    <div className='pl-1'>
                        <div className='text-xs'>
                            {data.label}
                        </div>
                        <div className='text-[7px] mt-1'>
                            Destination
                        </div>
                    </div>
                    <div className='bg-gray-200 w-5 h-7 rounded flex items-center justify-center'>
                        <MdArrowBack />
                    </div>
                </div>
                <Handle
                    type="target"
                    position={Position.Left}
                    className="bg-green-500 w-1 h-5 rounded-none"
                />
            </div>
        </div>
    );
};