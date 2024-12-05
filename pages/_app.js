import '../styles/index.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    const siteUrl = `https://wedding-newsletter.vercel.app`; // 실제 사이트 URL로 변경하세요
    const defaultOgImage = `${siteUrl}/assets/wedding/DSC00234-.webp`; // 이미지 경로를 실제 경로로 수정하세요

    return (
        <>
            <Head>
                {/* Open Graph 기본 메타 태그 */}
                <meta property="og:title" content="최태권 ♥ 임현정 결혼 소식" />
                {/* <meta property="og:description" content="WEDDING LETTER" /> */}
                <meta property="og:image" content={defaultOgImage} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;