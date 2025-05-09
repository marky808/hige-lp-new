## 追加仕様の詳細

### 1. グラフィカルな診断結果表示
- **レーダーチャート**: 5つのリスク領域（キャッシュフロー対策、保険対策、資産運用、老後資金、税金対策）を視覚的に表示
- **ゲージチャート**: 総合スコアをドーナツ型ゲージで表示、スコアに応じて色分け（緑: 良好、黄色: 注意、オレンジ: 警告、赤: 危険）
- **カテゴリー別スコアバー**: 各リスクカテゴリーごとにスコアを色分けされたバーで表示
- **パーソナライズされた分析**: 回答データに基づいた詳細な分析とカテゴリー別のアドバイスを表示
- **カラーコーディング**: 各カテゴリーに固有の色を割り当て、視覚的に区別しやすくデザイン

### 2. カテゴリー別質問管理システム
- **5つのリスクカテゴリー**: 質問を「キャッシュフロー」「保険」「投資」「老後資金」「税金」の5カテゴリーに分類
- **カテゴリーごとの色分け**: カテゴリーヘッダーに個別の色を設定し、現在の質問カテゴリーを視覚的に表示
- **カテゴリー別スコア集計**: 回答データをカテゴリーごとに集計・保存する機能を実装
- **プログレスバー**: 質問の進行状況を視覚的に表示するプログレスバーを追加

### 3. LINE友達登録フロー管理
- **初回/2回目判定**: LocalStorageを使用して、初めての訪問か2回目以降の訪問かを判定
- **アクセス経路判定**: URLパラメーター（?from=line）を使用してLINEからのアクセスを識別
- **初回訪問者向け表示**: 初めての訪問ではLINE友達登録画面を表示、8秒後に「LINE友達登録完了」ボタンを表示
- **登録済みユーザー対応**: 「すでに登録されている方はこちら」リンクを追加、LINE公式アカウントへの導線確保
- **2回目以降の表示**: LINE登録済みユーザーは登録画面をスキップし、直接結果表示画面へ遷移

### 4. パーソナライズされた改善アドバイス
- **弱点カテゴリー検出**: スコアが低いカテゴリーを自動検出する機能
- **カテゴリー別アドバイス**: 検出された弱点カテゴリーに応じた具体的な改善アドバイスを表示
- **総合的な診断結果**: スコアに応じた4段階の診断結果と対応するアドバイスを表示


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


## 2. Personal Type Diagnosis

**Folder Name**: `personal-type-diagnosis`


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
