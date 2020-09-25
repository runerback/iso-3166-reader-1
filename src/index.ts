import { Config, ContinentModel, CountryData, CountryDetailData, LinkedData, WorldModel } from './module';
import request from './request';
import matches from './matches';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { ContinentPattern, CountryDetailPattern, CountryPattern } from './patterns';

read()
    .then((data: WorldModel) => {
        fs.writeFileSync(
            path.resolve('./world.json'),
            JSON.stringify(data, null, '  ')
        );
        console.log('done');
    })
    .catch((error: Error) => console.error(error));

function readConfig(): Config {
    const { rootURL, cachePath } = (<Config>JSON.parse(fs.readFileSync(
        path.resolve('./config.json'),
        'utf-8')));

    const safeCachePath = path.resolve(cachePath);
    if (!fs.existsSync(safeCachePath)) {
        fs.mkdirSync(safeCachePath);
    }

    return {
        rootURL: rootURL,
        cachePath: safeCachePath
    };
}

async function read(): Promise<WorldModel> {
    const config = readConfig();

    const world = <WorldModel>{
        continents: []
    };

    const rootHtml = await request(config.rootURL, config);

    for (const continentData of continentIterator(rootHtml, config)) {
        const continent = <ContinentModel>{
            name: continentData.name,
            countries: []
        };

        const continentHtml = await request(continentData.url, config);

        for (const countryData of countryIterator(continentHtml, config)) {
            const countryHtml = await request(countryData.url, config);

            for (const detail of countryDetailIterator(countryHtml, config)) {
                continent.countries.push({
                    name: detail.name,
                    code2: countryData.data!.code2,
                    code3: countryData.data!.code3,
                    flag: await request(new URL(detail.data!.flag, config.rootURL).toString(), config)
                });
            }
        }

        world.continents.push(continent);
    }

    return world;
}

function* continentIterator(html: string, config: Config): IterableIterator<LinkedData> {
    for (const group of matches(ContinentPattern, ['g'], html)) {
        yield {
            name: group['name'].valueOf(),
            url: new URL(group['link'].valueOf(), config.rootURL).toString()
        };
    }
}

function* countryIterator(html: string, config: Config): IterableIterator<LinkedData<CountryData>> {
    for (const group of matches(CountryPattern, ['g', 's'], html)) {
        yield {
            name: group['name'].valueOf(),
            url: new URL(group['link'].valueOf(), config.rootURL).toString(),
            data: {
                code2: group['code2'].valueOf(),
                code3: group['code3'].valueOf()
            }
        };
    }
}

function* countryDetailIterator(html: string, config: Config): IterableIterator<LinkedData<CountryDetailData>> {
    for (const group of matches(CountryDetailPattern, ['g', 's', 'i'], html)) {
        yield {
            name: group['name'].valueOf(),
            url: '', // end here for now
            data: {
                flag: new URL(group['flag'].valueOf(), config.rootURL).toString(),
                code: group['code'].valueOf()
            }
        };
    }
}