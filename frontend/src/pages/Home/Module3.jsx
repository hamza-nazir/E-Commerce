import './Module3.css';

const Module3 = () => {
    return (
        <div className='m3-container'>
            <div className="m3-content-wrapper">
                <div className="m3-text-content">
                    <p className='m3-subheading'>THE CRAFT</p>
                    <h1 className='m3-main-heading'>Precision in <br /><span className='m3-accent-text'>Every Detail</span></h1>
                    <p className='m3-description'>
                        From the selection of premium fabrics to the final stitch, every shirt undergoes rigorous quality control. Our commitment to excellence ensures that each piece meets the highest standards of durability, comfort, and style.
                    </p>
                    <ul className='m3-feature-list'>
                        <li className='m3-feature-item'>
                            <div className='m3-feature-icon'>✓</div>
                            Premium Cotton & Linen Blends
                        </li>
                        <li className='m3-feature-item'>
                            <div className='m3-feature-icon'>✓</div>
                            Precision Tailoring
                        </li>
                        <li className='m3-feature-item'>
                            <div className='m3-feature-icon'>✓</div>
                            Sustainable Manufacturing
                        </li>
                    </ul>
                    <a href="#" className='m3-learn-more'>
                        LEARN MORE
                        <span className='m3-arrow'>→</span>
                    </a>
                </div>
                <div className="m3-image-container">
                    <div className='m3-image-frame'>
                        <img src="/images/shirt-5.jpg" alt="Premium shirt craftsmanship" className='m3-featured-image' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Module3;