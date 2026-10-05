import { useState, useEffect } from 'react'
import './AboutUs.css'
import axios from 'axios'
import loadingIcon from './loading.gif'

  /**
   * A nested function that fetches the about us section from the back-end server.
   */
const AboutUs = props => {
  const [about, setAbout] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
   useEffect(() => {
       axios
       .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
       .then(response => {
        // axios bundles up all response data in response.data property
        const about = response.data
        setAbout(about)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
}, [])

  return (
  <>
    {error && <p className="AboutUs-error">{error}</p>}

    {!loaded && <img src={loadingIcon} alt="loading" />}

    {about && (
      <>
        <h1>{about.title}</h1>

        <img
          src={about.imageUrl}
          alt={about.imageAlt}
          width="200"
        />
        {/* i need to display my intro paragraph by paragraph since it's an array with multiple strings */}
        {about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    )}
  </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
