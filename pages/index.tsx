import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import { Card } from '../components/Card'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Levi Terry</title>
        <meta name="description" content="Levi Terry's Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header name="Levi Terry"/>
      <h1 id="about">About</h1>
      <p>Hello, I'm Levi Terry, I am a software developer based in Southern Nevada. I first started programming in 2012 when I discovered the language/program known as <a href='https://scratch.mit.edu' target='_blank'>Scratch</a>. Soon after I fell in love with programming and have since then taken several classes in Computer Science and have self-taught myself utilizing numerous online resources such as <a href='https://youtube.com' target='_blank'>YouTube</a>. I have used several languages including but limited to HTML, CSS, JavaScript, and Java</p>
      <h1 id="projects">Projects</h1>
      {/* <div className={styles.grid}> */}
        <Card title="DuckBot" description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}/>

      <h1 id="experience">Experience</h1>
      <Card title="Code Ninjas" description={`March 2022-PRESENT\nAssisted in teaching children to code.`} link="https://codeninjas.com/"/>

        <div>
          <form id="contact" onSubmit={onContactSubmit}>
            <label htmlFor='name'>Name: </label> 
            <TextInput type='text' name="name" placeholder='Your name' />
            
            <label htmlFor='email'>Email: </label>
            <TextInput type='email' name="email" placeholder='you@yourdomain.com' />

            <label htmlFor='message'>Message: </label>
            <textarea className={styles.text} name="message" placeholder='Message'/>

            <Button name="submit" type='submit' text='Submit'/>
        </form>
      </div>
    </div>
    </>
  )
}

const onContactSubmit = (event : React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  console.log(event.target)
}
export default Home
