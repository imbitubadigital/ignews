import styles from '../styles/pages/home.module.scss'
import Head from 'next/head'
import {SubscribeButton} from '../components/SubscribeButton'
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from '../services/stripe'
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>Home | Ig.News</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>Get access to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
    </>
  )
}


/* getServerSideProps: cria página estática e so recria conforme
  o tem informado em segundos no parâmetro <revalidate>
*/
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IZyU2DbumPO1jeQgC5mCp3A', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: "USD"
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 horas
  }
}

/* getServerSideProps: chama toda vez que carrega a pagina */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1IZyU2DbumPO1jeQgC5mCp3A', {
//     expand: ['product']
//   })

//   console.log('price', price);

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-Us', {
//       style: 'currency',
//       currency: "USD"
//     }).format(price.unit_amount / 100)
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }
