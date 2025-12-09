import type { UVerifyCertificate } from '@uverify/core';
import Certificate from './Certificate';

/**
 * This is the main application component for the ScanTrust Product Verification template.
 * It will not be used in production, but it is useful for local development and testing.
 *
 * UVerify will import the Certificate class and use it to render the product verification.
 * You can adjust the metadata and other parameters as needed for your testing purposes.
 */
function App() {
  const certificate = new Certificate();
  const hash =
    'aecfb5054637aef7551cc388255515399183e3b2fe37b07398a9769dd18f709a';

  const metadata = {
    productName: 'Tsitska-Tsolikouri-Krakhuna (2023)',
    brandName: 'Baia\'s Wine',
    brandStory: `Baia's Wine was founded in 2015 by the young wine enthusiast Baia Abuladze. Quickly, Baia revitalized and revolutionized traditional family winemaking practices along with her siblings — Gvantsa and Giorgi. Today, the Abuladzes operate under two brands: Baia's Wine and Gvantsa's Wine. Both companies are 100% family-owned.

The Abuladze siblings were born and raised in the Village of Obcha, in the western Georgian region of Imereti. They grew up with vineyards, greenery, fresh produce, and animals; spent their free time exploring the wonders of nature.

The year 2015 was a game changer for the Abuladzes: by winning a small grant in the local agricultural startup competition, Baia established her own wine company called "Baia's Wine" and remodelled the family production structure with the help of her younger siblings.

Between Baia's Wine and Gvantsa's Wine the Abuladzes offer Tsolikouri, Tsitska, Krakhuna, Aladasturi, and Otskhanuri Sapere from Obcha and export to the U.S., Canada, Germany, France, the U.K., Ireland, Sweden, Norway, Denmark, Japan, China, Latvia, and Switzerland.`,
    batchNumber: 'Lot 3021TT10074',
    serialNumber: '404060e4-a01e-4e55-95d5-ebaa711b4c00',
    bottleNumber: 'Bottle 4 of 1400',
    scanCount: '93',
    producerAddress: '1000, Meore Obcha, Bagdati, Georgia',
    vintageYear: '2023',
    productCategory: 'Wine',
    fermentationVessel: 'Qvevri',
    fermentationDuration: '12 days',
    harvestLocation: 'Meore Obcha',
    harvestDate: '2023-09-25',
    verificationStatus: 'Verified',
    verificationUrlBase: 'https://cardanofoundation.org/case-studies/bolnisi',
    websiteUrl: 'https://baiaswine.com',
    facebookUrl: 'https://facebook.com/baiaswine',
    instagramUrl: 'https://instagram.com/baiaswine',
    projectInfo: `Cardano Foundation's Blockchain Solution to Authenticate Georgia's Prized Wines

Wine has always been a symbol of culture and tradition, and the country of Georgia, with its ancient winemaking heritage, takes this concept to a whole new level. Georgia's association with wine dates back thousands of years, making it the oldest winemaking region in the world.

In a bold move, the Cardano Foundation embarked on a groundbreaking pilot project in partnership with Baia's Wine and Scantrust, aiming to safeguard the authenticity and provenance of Georgian wine through the use of digital signatures, a groundbreaking approach that presented the wine's origin and quality on an immutable ledger.

This multi-party project is a testament to the innovative potential of blockchain technology and how a collaborative spirit can positively influence a legacy industry.`,
  };

  const uVerifyCertificate: UVerifyCertificate = {
    hash: hash,
    metadata: JSON.stringify(metadata),
    blockHash:
      '16e061b5f3de8b966f5f64fe4b2dada37f0a06c209f31ab538f250a997211c93',
    blockNumber: 11936558,
    transactionHash:
      '44268fa73efee7767c6f36434cb4392f446a8bb274da32d9c32657503192df32',
    address: 'addr1vqqj4545qe59w2jkaa6gf5xq00vu8kk2989553fk5qh4orcamfqq5',
    slot: 157145300,
    creationTime: 1748711772720,
    issuer: 'addr1vqqj4545qe59w2jkaa6gf5xq00vu8kk2989553fk5qh4orcamfqq5',
  };

  return (
    <>
      {certificate.render(hash, metadata, uVerifyCertificate, <></>, {
        hashedMultipleTimes: false,
        firstDateTime: new Date(1748711772720).toDateString(),
        issuer: 'addr1vqqj4545qe59w2jkaa6gf5xq00vu8kk2989553fk5qh4orcamfqq5',
        serverError: false,
        isLoading: false,
      })}
    </>
  );
}

export default App;
