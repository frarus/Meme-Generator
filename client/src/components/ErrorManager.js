
import error404 from '../icons/error404.jpg'
import error401 from '../icons/error401.jpg'
import error500 from '../icons/error500.jpg'
import {Image} from 'react-bootstrap'


function ErrorDisplay(props) {

    return (

        props.error === 500 ?
            <Image src={error500} fluid style={{ flex: 1, resizeMode: 'cover' }} className={'center-image'} />
            : props.error === 404 ?
                <Image src={error404} fluid style={{ flex: 1, resizeMode: 'cover' }} className={'center-image'} />
                : props.error === 401 ?
                    <Image src={error401} fluid style={{ flex: 1, resizeMode: 'cover' }} className={'center-image'} /> : <></>
    )


}

export { ErrorDisplay }