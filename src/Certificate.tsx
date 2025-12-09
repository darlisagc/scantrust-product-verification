import {
  Template,
  type ThemeSettings,
  type UVerifyCertificate,
  type UVerifyCertificateExtraData,
  type UVerifyMetadata,
} from '@uverify/core';
import type { JSX } from 'react';

/**
 * ScanTrust-style Product Verification Template for UVerify.
 *
 * This template is designed for product authentication and verification,
 * similar to ScanTrust's anti-counterfeiting solution.
 */
class Certificate extends Template {
  public name = 'ScanTrust Product Verification';
  public theme: Partial<ThemeSettings> = {
    background:
      'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400',
  };

  /**
   * Layout metadata defines the product information fields that will be
   * displayed in the metadata editor when creating a verification record.
   *
   * These fields capture essential product and verification details.
   */
  public layoutMetadata = {
    productName: 'The name of the product',
    brandName: 'The brand or manufacturer name',
    brandStory: 'The story and background of the brand/producer',
    batchNumber: 'The batch or lot number',
    serialNumber: 'Unique product serial number or UID',
    bottleNumber: 'Individual bottle number (e.g., "4 of 1400")',
    scanCount: 'Number of times this product has been scanned',
    producerAddress: 'Physical address of the producer',
    vintageYear: 'Year of production/vintage',
    productCategory: 'Product category or type',
    fermentationVessel: 'Type of fermentation vessel used',
    fermentationDuration: 'Duration of fermentation process',
    harvestLocation: 'Location where raw materials were harvested',
    harvestDate: 'Date of harvest',
    verificationStatus: 'Initial verification status',
    verificationUrlBase: 'Base URL for verification (e.g., "https://cardanofoundation.org/case-studies/bolnisi")',
    websiteUrl: 'Brand/product website URL',
    facebookUrl: 'Facebook page URL',
    instagramUrl: 'Instagram profile URL',
    projectInfo: 'Information about blockchain/verification project',
  };

  /**
   * @param hash string
   * @description The hash of the product data stored on the blockchain.
   * @param metadata UVerifyMetadata
   * @description The product metadata, including brand, batch, and verification details.
   * @param certificate UVerifyCertificate | undefined
   * @description The verification data retrieved from the blockchain, including transaction details.
   * @param pagination JSX.Element
   * @description The pagination component for navigating through multiple verifications.
   * @param extra UVerifyCertificateExtraData
   * @description Additional data such as loading state and server errors.
   * @returns the rendered product verification component as a JSX element.
   */
  public render(
    hash: string,
    metadata: UVerifyMetadata,
    certificate: UVerifyCertificate | undefined,
    pagination: JSX.Element,
    extra: UVerifyCertificateExtraData
  ): JSX.Element {
    if (extra.isLoading) {
      return (
        <div className="flex items-center justify-center h-full text-lg font-semibold text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Verifying product authenticity...</p>
          </div>
        </div>
      );
    }

    if (extra.serverError) {
      return (
        <div className="flex items-center justify-center h-full text-lg font-semibold">
          <div className="max-w-md mx-auto p-6 bg-red-100 text-red-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Verification Error</h2>
            <p>Unable to verify product. Please try again or contact support.</p>
          </div>
        </div>
      );
    }

    const isVerified = certificate !== undefined;
    const scanDate = new Date();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.productName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="font-semibold">{metadata.brandName}</span>
              {metadata.bottleNumber && <span>• {metadata.bottleNumber}</span>}
              {metadata.scanCount && (
                <span>• This product has been scanned {metadata.scanCount} times</span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Verification Status */}
          <div className={`mb-8 p-6 rounded-lg shadow-md ${
            isVerified ? 'bg-green-100 border-l-4 border-green-500' : 'bg-yellow-100 border-l-4 border-yellow-500'
          }`}>
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isVerified ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <div>
                <p className="font-bold text-lg">{isVerified ? 'Verified' : 'Unable to Verify'}</p>
                <p className="text-sm">Authentication powered by UVerify on Cardano</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          {metadata.brandStory && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About {metadata.brandName}</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {metadata.brandStory}
              </div>
            </div>
          )}

          {/* Track & Trace Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Track and Trace</h2>

            {/* Product Journey Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Your Scan</p>
                    <p className="font-semibold">{scanDate.toLocaleDateString()}</p>
                  </div>
                </div>

                {metadata.producerAddress && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Producer Address</p>
                      <p className="font-semibold">{metadata.producerAddress}</p>
                    </div>
                  </div>
                )}

                {metadata.vintageYear && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vintage Year</p>
                      <p className="font-semibold">{metadata.vintageYear}</p>
                    </div>
                  </div>
                )}

                {metadata.fermentationVessel && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fermentation Vessel</p>
                      <p className="font-semibold">{metadata.fermentationVessel}</p>
                    </div>
                  </div>
                )}

                {metadata.fermentationDuration && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fermentation Duration</p>
                      <p className="font-semibold">{metadata.fermentationDuration}</p>
                    </div>
                  </div>
                )}

                {metadata.harvestLocation && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Harvest Location</p>
                      <p className="font-semibold">{metadata.harvestLocation}</p>
                    </div>
                  </div>
                )}

                {metadata.harvestDate && (
                  <div className="flex">
                    <div className="mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grape Harvesting</p>
                      <p className="font-semibold">{new Date(metadata.harvestDate + '').toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Verification</h2>

            {/* Verify Transaction */}
            {certificate && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Verify Transaction</h3>
                <p className="text-gray-700 mb-4">
                  The Cardano blockchain enables you to verify the authenticity of this product.
                  By utilizing immutable ledger records and digital signatures, we safeguard the data provenance.
                </p>
                <p className="text-sm text-gray-600 mb-4">Want to see it for yourself? Click the button below:</p>
                <a
                  href={
                    metadata.verificationUrlBase
                      ? `${metadata.verificationUrlBase}?transaction=${certificate.transactionHash}`
                      : `https://cardanofoundation.org/case-studies/bolnisi?transaction=${certificate.transactionHash}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold"
                >
                  VIEW SUPPLY CHAIN TRANSACTION ON THE CARDANO BLOCKCHAIN
                </a>
              </div>
            )}

            {/* Verify Data Integrity */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Verify Data Integrity</h3>
              <p className="text-gray-700 mb-4">
                To confirm the authenticity of your product, you can utilize the data provided in the Supply Chain
                transaction mentioned above for validation.
              </p>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-sm text-gray-600 mb-2">Product Hash:</p>
                <p className="font-mono text-xs break-all text-gray-900">{hash}</p>
              </div>
              {certificate && (
                <div className="bg-gray-100 p-4 rounded mt-4">
                  <p className="text-sm text-gray-600 mb-2">Transaction Details:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Transaction Hash:</p>
                      <p className="font-mono text-xs break-all text-gray-900">{certificate.transactionHash}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Block Number:</p>
                        <p className="font-mono text-xs text-gray-900">{certificate.blockNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Slot:</p>
                        <p className="font-mono text-xs text-gray-900">{certificate.slot}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verify Product Authenticity */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Verify Product Authenticity</h3>
              <p className="text-gray-700 mb-4">
                This product includes a secure QR code label to ensure product authenticity, which has been
                added before shipment. The QR code verification provides an additional layer of security.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Serial Number:</strong> {metadata.serialNumber}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Batch Number:</strong> {metadata.batchNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Cardano Project Info */}
          {metadata.projectInfo && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Cardano Project</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {metadata.projectInfo}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {metadata.facebookUrl && (
                <a
                  href={String(metadata.facebookUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  "{metadata.brandName}" on Facebook
                </a>
              )}
              {metadata.instagramUrl && (
                <a
                  href={String(metadata.instagramUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  "{metadata.brandName}" on Instagram
                </a>
              )}
              {metadata.websiteUrl && (
                <a
                  href={String(metadata.websiteUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  "{metadata.brandName}" Website
                </a>
              )}
            </div>
          </div>

          {pagination}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 py-6">
            <p>Powered by UVerify on Cardano</p>
            <p className="mt-2">© 2025 UVerify</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Certificate;
