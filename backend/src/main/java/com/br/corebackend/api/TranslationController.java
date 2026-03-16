package com.br.corebackend.api;

import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

@RestController
@RequestMapping("/translations")
@CrossOrigin(origins = "http://localhost:4200")
public class TranslationController {

    MessageSource messageSource;

    public TranslationController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    
    @GetMapping
    public Map<String, String> getTranslations(@RequestParam String lang) {
        Locale locale = Locale.forLanguageTag(lang);

        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        Map<String, String> translations = new HashMap<>();
        

        bundle.keySet().forEach(key -> translations.put(key, bundle.getString(key)));
        return translations;
    }
}