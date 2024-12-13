"use client";

import { Text, Spinner, Center, Divider, Box } from "@chakra-ui/react";
import styles from '../../../page.module.css'
import { useBlock, useBlockNumber } from '@starknet-react/core';
import { formatBalance, readableDate } from '@/utils/utils';

export default function DisplayBlockChain() {
  const { data: blockNum } = useBlockNumber({ refetchInterval: 10_000 });
  const { data: blockContent } = useBlock({ refetchInterval: 10_000 });


  return (
    <>
      <Box bg='gray.300' color='black' borderWidth='1px' borderRadius='lg'>
        {!blockContent ? (
          <Center>
            <Spinner color="blue" size="sm" mr={4} />  Fetching data ...
          </Center>
        ) :
          (
            <>
              <Text className={styles.text1}>Last block number = {blockNum} </Text>
              <Text className={styles.text1}>Starknet version = {blockContent.starknet_version}  </Text>
              <Text className={styles.text1}> BlockTimeStamp = {blockContent.timestamp} ({readableDate(blockContent.timestamp)})  </Text>
              <Text className={styles.text1}>BlockGasprice =
                in Gfri : {formatBalance(BigInt(blockContent.l1_gas_price.price_in_fri), 9)}
                ,  in Gwei : {formatBalance(BigInt(blockContent.l1_gas_price.price_in_wei), 9)}
              </Text>
              <Divider></Divider>
            </>
          )
        }
      </Box>
    </>
  )
}