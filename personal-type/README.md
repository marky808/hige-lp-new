# -personal-type-diagnosis
# Project Overview

This project consists of two web applications:
1. **Personal Risk Diagnosis**
2. **Personal Type Diagnosis**

Each application is comprised of the following four pages:
- **Cover Page (`index.html`)**: Introduces the diagnosis, explains its features (e.g., instant diagnosis, free evaluation, etc.), and provides a "Start Diagnosis" button.
- **Loading Page (`loading.html`)**: Displays a loading screen (e.g., with a spinner and "Diagnosing..." message) after all quiz questions are completed, while results are being calculated. After a set wait time, it automatically redirects to the Results page.
- **Quiz Page (`quiz.html`)**: Presents the quiz questions.
  - For the Personal Risk Diagnosis, the quiz is a scored questionnaire.
  - For the Personal Type Diagnosis, there are 20 Yes/No questions with category headers (e.g., Family, Capital, Self, Risk) shown above each group.
  
  User responses are stored (using `localStorage` in the sample code) and, upon completion of the quiz, the user is redirected to the Loading page.
  
- **Results Page (`result.html`)**: Displays the diagnosis result based on the user's responses. For the Personal Risk Diagnosis, this is based on the total score; for the Personal Type Diagnosis, it shows one of 16 possible types. A "Back to LINE" button (with a LINE icon from Font Awesome) is provided for navigation back to the Cover page.

---

# Project Structure

The project is organized into two separate folders, one for each application:

## 1. Personal Risk Diagnosis

**Folder Name**: `personal-risk-diagnosis`

---

# 更新履歴

## 2025年4月25日更新
- **診断結果ページ（`result.html`）のグラフィカル化対応**:
  - Chart.jsを導入し、レーダーチャートによる4つの特性（家族、資金、自分、リスク）の視覚化を実装
  - カテゴリごとのスコアをカラフルな円形バッジで表示（家族：ピンク、資金：青、自分：黄色、リスク：緑）
  - 各カテゴリのスコアをアニメーション付きプログレスバーで視覚化
  - 向いている投資方法をアイコン付きカード形式で表示
  - 全体的なデザインを改良し、診断結果の訴求力を向上
  - スマートフォンでも見やすいレスポンシブデザインを実装

- **バグ修正**:
  - `quiz.html`のエラーメッセージ「Cannot read properties of undefined (reading 'group')」を修正
  - 質問表示処理の安全性向上とエラーハンドリングの強化
  - 16パターン全ての診断結果タイプ定義を追加し「診断に不具合がありました」エラーを解消

---

# Deployment Instructions

1. **Verify Files**:  
   Ensure that each project folder contains the following four HTML files: `index.html`, `loading.html`, `quiz.html`, and `result.html`.

2. **Zip the Folders**:  
   - On **Windows**: Right-click on each folder and choose "Send to" → "Compressed (zipped) folder."
   - On **macOS**: Right-click on each folder and select "Compress."

3. **Share with the Engineer**:  
   Provide the ZIP files or upload the projects to GitHub. If using GitHub, share the repository URLs with the engineer so they can clone or download the project.

---

# Additional Notes

- **Browser Preview**:  
  Each HTML file can be opened directly in a web browser for testing.

- **Local Storage Usage**:  
  The quiz pages store user responses using `localStorage`. The Loading and Results pages retrieve this data. Adjust this mechanism if integrating with a backend.

- **External Resources**:  
  The applications use Google Fonts and the Font Awesome CDN. An active internet connection is required for these resources to load correctly.

- **Customization**:  
  The provided code is a sample. Feel free to modify colors, animations, or any other settings to meet your specific project requirements.

---

By following these instructions, the engineer should be able to easily set up, run, and deploy the project. If you have any further questions or need additional information, please let me know.
