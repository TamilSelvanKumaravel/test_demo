const puppeteer = require('puppeteer')


const selectors={
    searchBox:'#search',
    nextbutton:'[class="s-pagination-strip"]'
}
async function target() {
    
    

   try {
       const URL = 'https://www.target.com/'
       const browser = await puppeteer.launch({
       headless: false,
      waitUntil:'load',
      // timeout:0  
    })
    const page = await browser.newPage()
    //await page.setDefaultNavigationTimeout(0);
    await page.goto(URL, {
     waitUntil: 'load',
     // Remove the timeout
     timeout: 0
 })
   
    await page.type(selectors.searchBox,'samsung j2')
    await page.keyboard.press('Enter')
    await page.waitForNavigation() 
    //await page.waitForSelector('div.styles__StyledCol-sc-fw90uk-0.fPNzT')
    //await page.waitForSelector('div.styles__StyledCardWrapper-sc-z8946b-0 dEnwQh.h-padding-a-tight')
   // await page.waitForSelector('section>div>div.styles__StyledCol-sc-fw90uk-0.fPNzT')
    await page.waitForSelector('a[data-test="product-title"]')
    //await page.waitForSelector('div>a')
    //await page.waitForSelector('div.Truncate-sc-10p6c43-0.flAIvs>a')
   // const example  = await page.$('.styles__StyledRowWrapper-sc-z8946b-1.jvgxLX')
    let newResults = await page.evaluate(() => {
            
        let results = []//#pageBodyContainer
           let items = document.querySelectorAll('section>div>div.styles__StyledCol-sc-fw90uk-0.fPNzT')
           items.forEach((item) => {
             
    
            results.push({
               // Url:item.querySelector('div.Truncate-sc-10p6c43-0.flAIvs>a').href
                Url:item.$$eval('a[data-test="product-title"]').href
               })
               console.log(results[item])
           })
           return results
       //console.log(results)
   })
   console.log(newResults)
    
      await browser.close()
  

  } catch (error) {
      console.error(error)
  }

  }target()