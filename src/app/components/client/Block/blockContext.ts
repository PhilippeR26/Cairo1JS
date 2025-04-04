import { create } from "zustand";

export interface DataBlock {
    timestamp: number,
    block_hash: string,
    block_number: number,
    l1_gas_price: {price_in_fri:string, price_in_wei:string},
}

export const dataBlockInit:DataBlock={
    timestamp: 0,
    block_hash: "N/A",
    block_number: 0,
    l1_gas_price: {price_in_fri:"N/A", price_in_wei:"N/A"},
}

export interface BlockState {
    dataBlock: DataBlock,
    setBlockData:(blockInfo:DataBlock) =>void,
}

export const useStoreBlock = create<BlockState>()(set => ({
    dataBlock:dataBlockInit ,
    setBlockData:(blockInfo:DataBlock)=>{set(_state=>({dataBlock:blockInfo}))}
}));
