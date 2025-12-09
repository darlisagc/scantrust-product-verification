# ScanTrust Product Verification Template

This is a custom UVerify UI template designed for product authentication and anti-counterfeiting use cases, similar to ScanTrust's verification system. This template provides a professional interface for verifying product authenticity using blockchain technology.

## Getting Started

As this is a standard React app, you can run the following commands to get started:

```bash
npm install
npm run dev
```

## Features

This template includes:

- **Product Information Display**: Shows product name, brand, batch number, serial number, and dates
- **Verification Status Banner**: Clear visual indication of product authenticity
- **Blockchain Verification**: Displays blockchain transaction details and verification data
- **Professional UI**: Clean, modern interface with responsive design
- **Anti-Counterfeiting Notice**: Security information for users
- **QR Code Ready**: Designed to work with QR code scanning workflows

## Customizing the UI

### Template Class

Once your app is up and running, you'll see an example product verification interface rendered by default. This serves as your starting point for creating a custom UI. To begin customizing, open the `src/Certificate.tsx` file in your code editor and make the necessary adjustments.

While the other files in this directory support your development environment, UVerify will only import the `Certificate.tsx` file.

### Render Function

A UVerify UI template is an implementation of the UVerify template interface. The main interaction point is the `render` function.

```typescript
  public abstract render(
    hash: string,
    metadata: UVerifyMetadata,
    certificate: UVerifyCertificate | undefined,
    pagination: JSX.Element,
    extra: UVerifyCertificateExtraData
  ): JSX.Element;
```

You can implement your custom logic and UI elements that fit your branding and user experience. UVerify will provide the necessary data through the parameters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `hash` | `string` | The hash of the product data being verified. |
| `metadata` | `Object` | The on-chain metadata including product name, brand, batch number, serial number, etc. |
| `certificate` | `UVerifyCertificate | undefined` | The blockchain verification data, or `undefined` if not available. |
| `pagination` | `JSX.Element` | Pagination controls for navigating through multiple verification records. |
| `extra` | `UVerifyCertificateExtraData` | Additional data such as whether it has been hashed multiple times, server error status, and loading state. |

```typescript
declare interface UVerifyCertificate {
  hash: string;
  address: string;
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  slot: number;
  creationTime: number;
  metadata: string;
  issuer: string;
}

type UVerifyCertificateExtraData = {
  hashedMultipleTimes: boolean;
  firstDateTime: string;
  issuer: string;
  serverError: boolean;
  isLoading: boolean;
};
```

### Theming

You can use custom colors and styles to match your branding, a color or gradient background, and customize the (default) footer visibility.

```typescript
type ThemeSettings = {
  background: string;
  colors: Colors;
  components: Components;
  footer: {
    hide: boolean;
  };
};
```

To override the default theme, just add `public theme: Partial<ThemeSettings> = { ... }` to your class. You can specify any of the properties in the `ThemeSettings` type.

### Whitelist Addresses

You can specify a list of whitelisted addresses that are allowed to use this template. If a non-whitelisted address would push a UVerify certificate, using the template id of this template, it wouldn't be rendered as a standard UVerify certificate, as the UVerify ui is doing an issuer check before rendering the certificate. This is useful for custom templates that should only be used by specific addresses.

```typescript
// An empty whitelist allows all addresses to use this template.
public whitelist = [
  'addr1qyleluql6elu7sktvncqfufnq675hlt9z922ah9sm45dmp7kjn0vsay0vq28379mczjmglmam3svuxyka0tyw0uchwjqmxmhg3',
  'addr_test1qqleluql6elu7sktvncqfufnq675hlt9z922ah9sm45dmp7kjn0vsay0vq28379mczjmglmam3svuxyka0tyw0uchwjqcsxhyw',
];
```

## 📜 License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). For more details, see the [LICENSE](LICENSE) file.

The core components of UVerify, including `uverify-ui` and `uverify-backend`, are licensed under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html). However, this repository provides extension points for creating custom UI templates that are dynamically imported by the UVerify platform.

### Key Points:
- **Modifying the UVerify core (backend or UI)**: Requires compliance with AGPL-3.0.
- **Creating custom UI templates**: Does *not* require compliance with AGPL-3.0. These templates remain under the Apache License 2.0, allowing you to create and distribute proprietary or open-source extensions without restrictions.

In short, you can build custom UIs without worrying about AGPL-3.0 compliance, as long as you’re not modifying the UVerify core.