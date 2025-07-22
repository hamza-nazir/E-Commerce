import './Module4.css';

const Module4 = () => {
    return (
        <div className='m4-container'>
            <div className='m4-content'>
                <div className='m4-header'>
                    <p className='m4-subtitle'>STAY CONNECTED</p>
                    <h1 className='m4-title'>FIRST TO KNOW</h1>
                    <div className='m4-divider'></div>
                </div>
                
                <p className='m4-description'>
                    Subscribe to receive exclusive access to new collections, limited releases, and insider updates before anyone else
                </p>
                
                <div className='m4-form-group'>
                    <div className='m4-input-container'>
                        <input 
                            type="email" 
                            placeholder='Enter your Email Address' 
                            className='m4-input'
                            required
                        />
                        <span className='m4-input-border'></span>
                    </div>
                    <button className='m4-submit-button'>
                        JOIN US
                        <span className='m4-button-icon'>→</span>
                    </button>
                </div>
                
                <p className='m4-disclaimer'>
                    By subscribing, you agree to our <a href="#" className='m4-link'>Privacy Policy</a> and <a href="#" className='m4-link'>Terms of Service</a>.
                </p>
            </div>
        </div>
    )
}

export default Module4;