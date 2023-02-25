import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import { Card } from '../components/Card'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'
import { Menu } from '../components/Menu'

import { Link } from '../components/Link'
import { Sidebar } from '../components/Sidebar'


const date = new Date(Date.now())
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ,'Saturday']

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Levi Terry | Home</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta property="og:title" content='Levi Terry' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_us' />
      </Head>

        {/* Header */}
          {/* <Header name="Levi Terry" /> */}
          {/* <Sidebar></Sidebar> */}

          {/* Introduction */}
          <div className='container'>
              <h2>Welcome to the website</h2>
              <section>
                <h1 id="about">About</h1>
                <p>Hello, I'm Levi Terry, I am a software developer based in Southern Nevada. I first started programming in 2012 when I discovered the language/program known as <Link link='https://scratch.mit.edu' target='_blank' text='Scratch'></Link>. Soon after I fell in love with programming and have since then taken several classes in Computer Science and have self-taught myself utilizing numerous online resources such as <Link link='https://youtube.com' target='_blank' text='YouTube'/>. I have used several languages including but limited to HTML, CSS, JavaScript, and Java</p>
            </section>
          </div>

        {/* Projects */}
        <div className='container'>
          <section>
            <h1 id="projects">Projects</h1>
            <div className={styles.grid}>
          <Card title="DuckBot" description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`} />
        </div>
          </section>
        </div>

        {/* <div className={styles.wave}></div> */}
          

        {/* Experience */}
        <div className="container">
        <section>
          <h1 id="experience">Experience</h1>
          <div className={styles.grid}>
            <Card title="Code Ninjas - Code Sensei" description={`March 2022 - PRESENT\nAssisted in teaching children to code.`} link="https://codeninjas.com/"/>
          </div>
        </section>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
        <form className={styles.contact} id="contact" action="/api/contact" method="post">
          <label htmlFor='name'>Name: <br /><TextInput type='text' name="name" placeholder='Your name'/></label> <br /><br />
          
          <label htmlFor='email'>Email: <br /><TextInput type='email' name="email" placeholder='you@yourdomain.com' /></label><br /><br />
          
          <label htmlFor='message'>Message: <br /><textarea className={styles.text} name="message" placeholder='Message'/></label><br /><br />

          <button type='submit' name='submit'>Submit</button>
            <Button name="submit" type='submit' text='Submit' />
        </form>
        </div>
        <div className={styles.typing}><div className={styles.blinker}></div>{" " + days[date.getDay()]}!</div>
          <a href='https://github.com/Typcial-Username/LeviTerry.dev' target="_blank">View Source</a>
      {/* <Menu /> */}
  </>
  )
}

const onContactSubmit = (event : React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  console.log(event.target)
}
export default Home