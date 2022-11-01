import github from '../../icons/github.svg'
import linkedin from '../../icons/linkedin.svg'

import './footer.css'

export default function Footer() {

    return (
        <div className='footer-wrapper'>
            <div className='footer-text'>
                A <a className='anchor' href='https://www.drinktrade.com'>Drink Trade</a> clone made by Jae Hwang
                <div className='footer-icons'>
                    <a href='https://github.com/jaeyoungh1'><img height='15' width='15' alt='github-icon' src={github}></img></a>
                    <a href='https://www.linkedin.com/in/jae-hwang-71654490/'><img height='15' width='15' alt='linkedin-icon' src={linkedin}></img></a>
                </div>
                <p>
                    Support your local coffee roaster.
                </p>
            </div>
        </div>
    )
}