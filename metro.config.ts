import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(__dirname);

// @ts-ignore
config.resolver.assetExts.push('db');

module.exports = config;
