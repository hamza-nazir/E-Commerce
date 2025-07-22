import './Module2.css';

const Module2 = () => {
    return (
        <div className='m2-container'>
            <div className="m2-content-wrapper">
                <div className="m2-text-content">
                    <p className="m2-section-label">PARTNERSHIPS</p>
                    <h2 className="m2-main-heading">Collaborations</h2>
                    <p className="m2-description">
                        Our skilled artisans and designers ensure that each garment is crafted with precision and attention to detail.
                    </p>
                </div>
                
                <div className="m2-services-container">
                    <div className="m2-service-item">
                        <div className="m2-icon-wrapper">
                            <i className="fas fa-handshake m2-service-icon"></i>
                        </div>
                        <h3 className="m2-service-title">Custom Tailoring</h3>
                        <p className="m2-service-description">Perfectly fitted garments tailored to your exact measurements</p>
                    </div>
                    
                    <div className="m2-service-item">
                        <div className="m2-icon-wrapper">
                            <i className="fas fa-briefcase m2-service-icon"></i>
                        </div>
                        <h3 className="m2-service-title">Alterations & Repairs</h3>
                        <p className="m2-service-description">Professional adjustments to refresh your favorite pieces</p>
                    </div>
                    
                    <div className="m2-service-item">
                        <div className="m2-icon-wrapper">
                            <i className="fas fa-cut m2-service-icon"></i>
                        </div>
                        <h3 className="m2-service-title">Bespoke Dressmaking</h3>
                        <p className="m2-service-description">Custom-made garments created from scratch</p>
                    </div>
                    
                    <div className="m2-service-item">
                        <div className="m2-icon-wrapper">
                            <i className="fa-solid fa-gear m2-service-icon"></i>
                          
                        </div>
                        <h3 className="m2-service-title">Embroidery & Monogramming</h3>
                        <p className="m2-service-description">Personalized detailing for unique statement pieces</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Module2;