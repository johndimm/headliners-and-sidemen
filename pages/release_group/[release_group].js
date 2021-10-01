//import React, {useState, useEffect} from 'react'
//import axios from 'axios'
import { useRouter } from 'next/router'
//import FirstAfter from 'components/FirstAfter'
//import LastBefore from 'components/LastBefore'
//import Center from 'components/Center'
//import Header from 'components/Header'
import BrowseLayout from 'components/BrowseLayout'

// const Index = () => {
export default function Index() {

  const router = useRouter()
  let { release_group } = router.query

  return <BrowseLayout release_group={release_group} />
}

// export default Index