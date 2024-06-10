# geometric-library

A Node based, visually agnostic implementation of geometric functions, both abstract and finite.

## Prerequisites

This library assumes you already have basic knowledge of concepts pertaining to algebra and geometry, including:

- **Abstracts**: magnitude, direction, position, coordinate, vector, point, figure, angle
- **Figures**: line, curve, ellipse, polygon
- **Transformations**: rotation, translation, reflection, scaling
- **Units**: radian, degree

## Usage

You may install this library into your JavaScript or TypeScript project using the following command:

```sh
npm install geometric-library
```

You may then `import` any of the classes listed in the **API** section and use them at your own discretion.

If you're using TypeScript for your project you can also `import` types and interfaces for all the exported functionalities, which is very much recommended as it will make your life easier in terms of understading how everything works.

## API

The types and interfaces exported from [./src/types/index.ts](./src/types/index.ts) should give you a pretty good idea of how to use any of the functionalities included in this library.

The following classes are available:

(Abstracts) `Flag` `Magnitude` `Angle` `Vector` `Point` `Figure`

(Figures) `Line` `Polygon` `QuadraticBezierCurve` `CubicBezierCurve` `ArcCurve` `Ellipse` `Circle`

## Dependencies

JavaScript is bad at math. Don't hate me for saying it, it's actually a pretty well known fact that JavaScript just struggles with algebra, especially when it involves floating point numbers. Here's one of the many articles about it if you want to learn more: [Why JavaScript is Bad At Math](https://javascript.plainenglish.io/why-javascript-is-bad-at-math-9b8247640caa) (by Alexandra Langton).

Though there are ways to combat these issues natively, for this library I chose to use an abstraction of [Decimal.js](https://mikemcl.github.io/decimal.js/), which does just that pretty efficiently.

As it is an intrinsic dependency so you don't have to install anything yourself.

## Contributing

This project is open to contribution.

If you have a bug to report please open an issue so it can be tracked and addressed as soon as possible. Do include information about how to reproduce the bug, the expected result and the actual result.

If there's a missing feature feel free to open an issue as well detailing the feature request and its value to the project and its users.

If you already have an idea of how to fix an issue or implement a feature, please also feel free to directly contribute by opening a pull request with the changes. Though the project includes some automated scripts for linting, cleaning, building, testing and deploying the code, please do try to adhere to the existing standards in terms of naming, directory structure and SOLID principles.

## TO DO

- Add a complete documentation of all the functionalities made available.
- Add examples.

## License

This project is published and distributed under the [MIT License](./LICENSE).
