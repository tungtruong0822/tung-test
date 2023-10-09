import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Viewer } from './components/Viewer';

const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUSIsInBpLmF0bSI6Ijd6M2gifQ.eyJzY29wZSI6WyJ2aWV3YWJsZXM6cmVhZCJdLCJjbGllbnRfaWQiOiJsVGc2U09jSXdKSGtXSnExVXY4UGw5eEVGUU5JcldLViIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9hand0ZXhwNjAiLCJqdGkiOiJ2TFRWdnk5dm9sbDVzOTZ0MjJZMEdheXZhc1NIMDNhNFlLak9iU2tFWndaUGVaWWxJb2lkSXBjTVBBSGlPdVgzIiwiZXhwIjoxNjk2ODE4NTM5fQ.KpPYdSjQ2WXUI13Zgh9BRTF4JPKDZpvpSF8rvq5qlAtbhNGhevW2FRXOgwI7K5tDv5LEaVTKlekSuEU24GWSt9Nc4LZ-ty7Yrj1CbGlg2FnzCHprjUL1LI5ZMLK8w7jG8gEO-gLvmkk44bqgBW96KbJTeH3KTvWIMzm5UxdwRGzu8iISQSDtNchtQNKyk34zj-rCqqm0kvsAp7BK5kVNXTcLHbtGhs2fgKcAri_J7xsMOmK56xctFKQ4Opo3QqxOCgKTyLdByWzPopa7odiV8MP9p-X_Imd41cwgxZTQgjs3EZJyhltRE6Xs4kcQgpzKXZYhZ4ucQtPpvLg2UnKnKA';
const MODEL_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bHRnNnNvY2l3amhrd2pxMXV2OHBsOXhlZnFuaXJ3a3YtYmFzaWMtYXBwL3JzdGFkdmFuY2Vkc2FtcGxlcHJvamVjdC5ydnQ';

export const App: React.FunctionComponent = () => {
    const [cameraPos, setCameraPos] = useState<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 });
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isolatedIds, setIsolatedIds] = useState<number[]>([]);
    return (
        <div>

            <div style={{ position: 'relative', width: '1900px', height: '900px' }}>
                <Viewer
                    runtime={{ env: 'AutodeskProduction2', api: 'streamingV2', accessToken: ACCESS_TOKEN }}
                    model={{ urn: MODEL_URN }}
                    extensions={['Autodesk.DocumentBrowser']}
                    selectedIds={selectedIds}
                    onCameraChange={ev => setCameraPos(ev.camera.getWorldPosition())}
                    onSelectionChange={ev => setSelectedIds(ev.ids)}
                    onIsolationChange={ev => setIsolatedIds(ev.ids)}
                />
            </div>

        </div>
    );
};

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

