import React from 'react';
import { Composition } from 'remotion';
import { UniversalVideo } from './UniversalVideo';
import { MainVideo } from './MainVideo';
import { ProjectSpec } from './types/project';
import defaultProjectJson from '../public/default_project.json';

const defaultProject = defaultProjectJson as unknown as ProjectSpec;

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Universal Dynamic Composition (driven by JSON props) */}
      <Composition
        id="UniversalVideo"
        component={UniversalVideo}
        durationInFrames={defaultProject.metadata.durationInFrames || 567}
        fps={defaultProject.metadata.fps || 30}
        width={defaultProject.metadata.width || 1080}
        height={defaultProject.metadata.height || 1920}
        defaultProps={{
          project: defaultProject,
        }}
        calculateMetadata={({ props }) => {
          const raw = props as any;
          const p: ProjectSpec = raw?.projectId
            ? (raw as ProjectSpec)
            : raw?.project || defaultProject;

          return {
            durationInFrames: p.metadata?.durationInFrames || 567,
            fps: p.metadata?.fps || 30,
            width: p.metadata?.width || 1080,
            height: p.metadata?.height || 1920,
          };
        }}
      />

      {/* 2. Legacy Fixed Composition (Edited0222) */}
      <Composition
        id="Edited0222"
        component={MainVideo}
        durationInFrames={567}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
