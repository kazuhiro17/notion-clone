# Repository Guidelines

## 言語ポリシー

本リポジトリに関するあらゆるやり取り（ドキュメント、Issue、PR、コミットメッセージ、コメント）は日本語で行います。外部ライブラリやテンプレート由来の英語表記はそのまま残す場合があります。

## プロジェクト構成とモジュール
- `src/`: React + TypeScript の実装本体
  - `pages/`: 画面コンポーネント（`Home.tsx`, `Signin.tsx` など）
  - `components/`: UI（`NoteList/`, `SideBar/`, `ui/`）
  - `modules/notes|auth/`: ドメイン層（`*.entity.ts`, `*.repository.ts`, `*.state.ts`）
  - `lib/`: 共通ユーティリティ（`supabase.ts`, `utils.ts`）
  - `types/`: 共有型定義
- `public/`: 静的アセット
- `dist/`: ビルド成果物（コミットしない）
- 主要設定: `vite.config.ts`, `tailwind.config.js`, `eslint.config.js`, `tsconfig*.json`

## ビルド・テスト・開発
- 開発: `npm run dev`（Vite 開発サーバ）
- ビルド: `npm run build`（`tsc -b` → `vite build`）
- プレビュー: `npm run preview`（ローカルでビルド結果を確認）
- Lint: `npm run lint`（ESLint 実行）

## コーディング規約・命名
- 言語: TypeScript（`strict` 有効、`@/*` エイリアスは `src/*` を指す）
- スタイル: ESLint 推奨設定 + React Hooks/Refresh。未使用変数・未使用引数を禁止。
- インデント: 2 スペース。セミコロンあり、import はグループ化して並べ替え。
- 命名: コンポーネントは PascalCase（例: `NoteItem.tsx`）、hooks は `useXxx`。
- モジュール分割: ドメインは `*.entity.ts`/`*.repository.ts`/`*.state.ts` を採用。

## テスト方針
- 現在テストランナー未導入。追加時は Vitest + React Testing Library を推奨。
- 例: `src/**/*.test.tsx`、`src/**/__tests__/*.test.ts`。
- ユニット優先、UI は振る舞いベース。将来的に主要ロジックのカバレッジ確保を目標化。

## コミット／プルリク
- コミット: Conventional Commits を推奨（例: `feat: add note search`）。
- PR 必須情報: 目的/背景、変更内容、動作確認手順、UI 変更のスクショ、関連 Issue、環境変数や DB 変更の有無。
- 小さく分割し、レビューしやすい差分を心掛ける。

## セキュリティと設定
- 環境変数: `.env.local` に保存しコミット禁止。
  - `VITE_SUPABASE_URL=...`
  - `VITE_SUPABASE_API_KEY=...`
- 機密値はログに出力しない。Supabase への操作は `src/lib/supabase.ts` 経由で行う。
