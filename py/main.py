import requests
import os

search_api = "yourdomain.com/api/v1/manganelo/search/'
content_api = 'yourdomain.com/api/v1/manganelo/comic/'
read_api = 'yourdomain.com/api/v1/manganelo/comic/read/'

headers = {}
headers['Referer'] = 'https://readmanganato.com/'

user = input("[Shiva] Search for Manga or paste in ID: ")

def getMangaContent(res):
    title = res['comic'][0]['title']
    chapters = res['comic'][0]['chapters']

    os.system('cls')
    print("[Shiva Comic Scraper ~ Manganelo]")

    print("Title: {0}\nAuthor: {1}\nStatus: {2}\nUpdated: {3}\nViews: {4}\nRating: {5}/5\n {6}\n\nTotal Chapters: {7}\n".format(
        res['comic'][0]['title'], res['comic'][0]['author'], res['comic'][0]['status'], res['comic'][0]['updated'], res['comic'][0]['views'], res['comic'][0]['ratings'],
        res['comic'][0]['description'], res['comic'][0]['total_chapters']
    ))

    print("Chapters:")

    chapter_id = []
    
    for x in range(0, len(res['comic'][0]['chapters'])):
        print('[{0}] {1}'.format(x, res['comic'][0]['chapters'][x]['chapter']))
        chapter_id.append(res['comic'][0]['chapters'][x]['chapter_id'])

    print('(* - all | 1, 2, 3 - multiple selection | 1 - one selection)')
    choose = input('[Shiva] Choose what chapter to Download: ')

    if choose == "*":
        for x in range(0, len(chapter_id)):
            res = requests.get(read_api + chapter_id[x])
            print("[Shiva] Download Chapters from ~ {0}".format(title))

            chapter_path = '{0}/{1}'.format(title, chapters[x]['chapter_id'].split('~')[1])

            if not os.path.exists(title):
                os.makedirs(title)
            if not os.path.exists(chapter_path):
                    os.makedirs(chapter_path)

            body = res.json()

            os.system('cls')

            for i in range(0, len(body['comic'][0]['images_clean'])):
                r = requests.get(body['comic'][0]['images_clean'][i], headers=headers)

                os.system('cls')
                print('[Shiva] Downloading {0}/{1} | From Chapter: {2}'.format(i + 1, len(body['comic'][0]['images_clean']), chapter_id[x].split('~')[1].split('-')[1]))

                with open('{0}/{1}.jpg'.format(chapter_path, i + 1), 'wb') as fh:
                    fh.write(r.content)
                    
            print('[Shiva] Finished Downloading.')
        
    elif " " in choose:
        print('multiple selections')
    elif int(choose) <= len(chapter_id):
        choose = int(choose)
        res = requests.get(read_api + chapter_id[choose])
        print("[Shiva] Download Chapters from ~ {0}".format(title))

        chapter_path = '{0}/{1}'.format(title, chapters[choose]['chapter_id'].split('~')[1])

        if not os.path.exists(title):
            os.makedirs(title)
        if not os.path.exists(chapter_path):
                os.makedirs(chapter_path)

        body = res.json()

        os.system('cls')
        print('[Shiva] Downloading 0/{0}'.format(len(body['comic'][0]['images_clean'])))

        for x in range(0, len(body['comic'][0]['images_clean'])):
            r = requests.get(body['comic'][0]['images_clean'][x], headers=headers)

            os.system('cls')
            print('[Shiva] Downloading {0}/{1}'.format(x + 1, len(body['comic'][0]['images_clean'])))

            with open('{0}/{1}.jpg'.format(chapter_path, x + 1), 'wb') as fh:
                fh.write(r.content)
                
        print('[Shiva] Finished Downloading.')

if 'manga' in user.lower():
    content = requests.get(content_api + user)

    res = content.json();

    if res['isSuccess'] == True:
        getMangaContent(res)
    else:
        print("[Shiva] Invalid Response, try again.")
else:
    query_result = requests.get(search_api + user)
    response = query_result.json()

    if response['isSuccess'] == True:
        os.system('cls')
        print("[Shiva Comic Scraper ~ Manganelo]")
        print("Search Results:\n")
        
        results = []

        for x in range(0, len(response['comic'])):
            print("[{0}] {1}".format(x, response['comic'][x]['title']))
            results.append(response['comic'][x]['link'])

        choose = input("[Shiva] Choose Manga: ")

        manga_selected = requests.get(content_api + results[int(choose)])
        manga_selected = manga_selected.json()
        getMangaContent(manga_selected)
