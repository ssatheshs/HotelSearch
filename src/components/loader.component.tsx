/** @jsx h */
import { h } from 'preact';
import * as styles from './loader.module.less'


type LoaderProps = {
  loading: boolean
}

const Loader = (props: LoaderProps) =>{
    return(
        <div>
            { props?.loading ? <div id="maskId" className={styles["loader"]}></div> : null } 
        </div>
    )
}

export default Loader
      
