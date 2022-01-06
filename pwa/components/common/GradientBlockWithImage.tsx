import styleGradient from '../../styles/GradientBlockWithImage.module.css'
import Image from 'next/image'

function GradientBlockWithImage({title, subtitle, image}) {
    return (
        <div className={styleGradient.gradientBackground} id="home">
            <div className="container">
                <div>
                    {title && <h1 itemProp="name">{title}</h1>}
                    {subtitle &&
                    <p className={styleGradient.tagline} itemProp="description">
                        {subtitle}
                    </p>
                    }
                </div>
            </div>
            {image &&
            <div className="img-holder mt-3">
                <Image src={image} priority className="img-fluid" alt={"Phone with notification"}/>
            </div>
            }
        </div>
    );
}

export default GradientBlockWithImage;
