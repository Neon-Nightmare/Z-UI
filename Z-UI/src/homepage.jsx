import './styling/homepage.css'

import { Link } from "react-router-dom";

export default function Homepage(){
    return(
        <><div>
            <div id="buttons">
                <div>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/login'>
                        Artist
                    </Link>
                </div>
                <div>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/browse'>
                        Listener
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}