import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)


    const send = (x?: boolean | null) => () => {

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setIsDisabled(true)


        let imageSrc: string;
        switch (x) {
            case true:
                imageSrc = success200;
                break;
            case false:
                imageSrc = error500;
                break;
            case undefined:
                imageSrc = error400;
                break;
            case null:
                imageSrc = errorUnknown;
                setCode('Error!')
                setText('Network Error')
                setInfo('AxiosError')
                break;
            default:
                break;
        }


        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test'


        axios
            .post(url, {success: x})
            .then((res) => {
                setImage(imageSrc);
                setText(res.data.errorText);
                setInfo(res.data.info)
                setCode('Код 200!');
            })
            .catch((e) => {
                    setImage(imageSrc);
                    setText(e.response.data.errorText);
                    setInfo(e.response.data.info)
                    setCode('Ошибка ' + e.response.status + '!');
                }
            )
            .finally(() => {
                setIsDisabled(false)
            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        disabled={isDisabled}
                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={isDisabled}
                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={isDisabled}
                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        disabled={isDisabled}
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13