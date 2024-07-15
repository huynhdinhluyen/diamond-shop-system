/* eslint-disable react/no-unescaped-entities */

const GIAAuthorizationLetter = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 mt-8 shadow-md">
            <div className='flex justify-between'>
                <div className="">
                    <img src="https://zeevector.com/wp-content/uploads/GIA-Logo-PNG@zeevector.com_.png" alt="GIA Logo" className="w-24" />
                </div>
                <div className="text-right text-xs text-gray-600">
                    <p>World Headquarters<br />
                        Gemological Institute of America, Inc.<br />
                        The Robert Mouawad Campus<br />
                        5345 Armada Drive<br />
                        Carlsbad, CA 92008 USA<br />
                        T +1 760 603 7239  T +1 800 421 7250<br />
                        F +1 760 603 4030<br />
                        GIA.edu</p>
                </div>
            </div>

            <h1 className="text-center text-2xl font-bold uppercase mt-8">Letter of Authorization</h1>
            <div className="mt-8 text-base leading-7">
                <p>June 7, 2024</p>
                <p>To whom it may concern,</p>
                <p>This letter is to confirm that <strong>DHL Diamond</strong>, with an address of Ward Long Thanh My, District 9, HCM City, Viet Nam, is <strong>authorized by GIA</strong> (Gemological Institute of America, Inc.) to import and display GIA branded materials and sales tools in their stores. Materials are not authorized for re-sale.</p>
                <p>The letter of authorization is effective from June 1, 2024 to June 1, 2025.</p>
                <div className="text-center">
                    <p><strong>DHL Diamond</strong><br />
                        Ward Long Thanh My, District 9<br />
                        HCM City, Vietnam<br />
                        Telephone: (+84) 123123123<br />
                        Email: DHLdiamond@gmail.com</p>
                </div>
            </div>
            <div className="mt-8">
                <strong>Thank you,</strong>
                <div className="mt-6">
                    <p>Tail Nay, GIA GG<br />
                        Senior Manager, Market Development<br />
                        5345 Armada Drive<br />
                        Carlsbad, California 92008<br />
                        USA</p>
                </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-600">
                <p>The World's Foremost Authority in Gemology&trade; Ensuring the Public Trust Through Nonprofit Service Since 1931</p>
                <p>Carlsbad New York Antwerp Bangkok Dubai Gaborone Hong Kong Johannesburg London Mumbai Ramat Gan Surat Taipei Tokyo</p>
            </div>
        </div>
    );
};

export default GIAAuthorizationLetter;
