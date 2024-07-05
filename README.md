# Face Comparison System

This project is a face comparison system built with `Node.js`, `Express.js`, and `human.js`. The system compares two face images and determines if they are similar.

## Features

- **Face detection and comparison**
- **Supports image uploads**
- **Returns similarity score and comparison result**

## Technologies Used

- [**Node.js:**](https://nodejs.org/en) JavaScript runtime for server-side development.
- [**Express.js:**](https://expressjs.com/) Web framework for Node.js.
- [**human.js:**](https://github.com/vladmandic/human) A flexible and powerful library for face detection and recognition.
- [**Multer:**](https://www.npmjs.com/package/multer) Middleware for handling `application/json`, used for file uploads.

## Installation

To run the face comparison system, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Victor1890/human-face-backend
    ```

2. Navigate to the project directory:
    ```bash
    cd human-face-backend
    ```

3. Install the required dependencies:
    ```bash
    pnpm install
    ```

4. Start test the server:
    ```bash
    pnpm dev
    ```

## Usage

To use the face comparison system, follow these steps:

1. Ensure your server is running.
2. Use a tool like Postman to send a POST request to `http://localhost:3000/api/faces` with two or more images face info in the json-data body, each with the key `faces`.

### Example Request

**URL:** `http://localhost:3000/api.faces`

**Method:** `POST`

**Body:** (json-data)
- `faces`: (array of object image file info)

### Example Request Payload
```ts
{
    /** face id */
    id: number;
    /** overall face score */
    score: number;
    /** detection score */
    boxScore: number;
    /** mesh score */
    faceScore: number;
    /** detected face box */
    box: Box;
    /** detected face box normalized to 0..1 */
    boxRaw: Box;
    /** detected face box size */
    size: [number, number];
    /** detected face mesh */
    mesh: Point[];
    /** detected face mesh normalized to 0..1 */
    meshRaw: Point[];
    /** face contours as array of 2d points normalized to 0..1 */
    /** face contours as array of 2d points */
    /** mesh keypoints combined into annotated results */
    annotations: Record<FaceLandmark, Point[]>;
    /** detected age */
    age?: number;
    /** detected gender */
    gender?: Gender;
    /** gender detection score */
    genderScore?: number;
    /** detected emotions */
    emotion?: {
        score: number;
        emotion: Emotion;
    }[];
    /** detected race */
    race?: {
        score: number;
        race: Race;
    }[];
    /** face descriptor */
    embedding?: number[];
    /** face distance from camera */
    distance?: number;
    /** face anti-spoofing result confidence */
    real?: number;
    /** face liveness result confidence */
    live?: number;
    /** face rotation details */
    rotation?: {
        angle: {
            roll: number;
            yaw: number;
            pitch: number;
        };
        matrix: [number, number, number, number, number, number, number, number, number];
        gaze: {
            bearing: number;
            strength: number;
        };
    } | null;
    /** detected face as tensor that can be used in further pipelines */
    tensor?: Tensor;
}
```

### Example Response

```json
{
    "Person 1": {
        "similarity": 0.75,
    },
    "Person 2": {
        "similarity": 0.59,
    },
}
```

## Endpoints

### POST /api/faces
- **Description:** Compares two uploaded face images and returns a similarity score.
- **Request:**
    - **Head*ers:** Content-Type: `application/json`
    - **Body:** One property in json-data with the key `faces`.
- **Response:**
    - **Status:** 200 (OK) if successful.
    - **Body:** JSON object with similarity score.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the [MIT License](/LICENSE).