import * as vscode from 'vscode';
import * as path from 'path';

export namespace util {
  export function product<T>(arrays: T[][]): T[][] {
    // clang-format off
    return arrays.reduce((acc, curr) =>
      acc
        // Append each element of the current array to each list already accumulated
        .map(
          prev => curr.map(
            item => prev.concat(item)
          )
        )
        .reduce(
          // Join all the lists
          (a, b) => a.concat(b),
          []
        ),
        [[]] as T[][]
      );
    // clang-format on
  }

  export type Maybe<T> = (T|null);

  export interface ConfigureArguments {
    key: string;
    value: (string|string[]|number|boolean);
  }

  export interface VariantConfigurationOptions {
    oneWordSummary?: string;
    description?: string;
    buildType?: Maybe<string>;
    linkage?: Maybe<string>;
    settings?: ConfigureArguments[];
    generator?: Maybe<string>;
    toolset?: Maybe<string>;
  }

  // export type VariantOptionChoices = Map<string, VariantOption>;

  export interface VariantSetting {
    description: string;
    default:
      string;
    choices: Map<string, VariantConfigurationOptions>;
  }

  export type VariantSet = Map<string, VariantSetting>;

  export interface VariantCombination extends vscode.QuickPickItem {
    keywordSettings: Map<string, string>;
  }

  export const DEFAULT_VARIANTS = {
    buildType: {
      'default$': 'debug',
      'description$': 'The build type to use',
      debug: {
        'oneWordSummary$': 'Debug',
        'description$': 'Emit debug information without performing optimizations',
        buildType: 'Debug',
      },
      release: {
        'oneWordSummary$': 'Release',
        'description$': 'Enable optimizations, omit debug info',
        buildType: 'Release',
      },
      minsize: {
        'oneWordSummary$': 'MinSizeRel',
        'description$': 'Optimize for smallest binary size',
        buildType: 'MinSizeRel',
      },
      reldeb: {
        'oneWordSummary$': 'RelWithDebInfo',
        'description$': 'Perform optimizations AND include debugging information',
        buildType: 'RelWithDebInfo',
      }
    },
    // The world isn't ready...
    // link: {
    //   ''$description$'': 'The link usage of build libraries',,
    //   'default$': 'static',
    //   static: {
    //     'oneWordSummary$': 'Static',
    //     'description$': 'Emit Static Libraries',
    //     linkage: 'static',
    //   },
    //   shared: {
    //     'oneWordSummary$': 'Shared',
    //     'description$': 'Emit shared libraries/DLLs',
    //     linkage: 'shared',
    //   }
    // }
  };

  export interface WorkspaceCache {
    variant?: Maybe<VariantCombination>;
  };

  export function normalizePath(p: string): string {
    let norm = path.normalize(p);
    while (path.sep !== path.posix.sep && norm.includes(path.sep)) {
        norm = norm.replace(path.sep, path.posix.sep);
    }
    return norm
  }
}